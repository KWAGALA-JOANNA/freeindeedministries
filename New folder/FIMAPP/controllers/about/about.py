from flask import Flask, request, jsonify, abort
from FIMAPP.models.about import AboutUs
from FIMAPP.extensions import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from functools import wraps
from flask import jsonify, request, session, Blueprint

about = Blueprint('about', __name__, url_prefix='/api/v1/about')

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        current_user = get_jwt_identity()
        if not current_user.get('is_admin'):
            abort(403, description="Admin access required")
        return fn(*args, **kwargs)
    return wrapper


@about.route('/get', methods=['GET'])
@jwt_required()
@admin_required
def get_about_us():
    try:
        about_us = AboutUs.query.first()  # Assuming there's only one record
        if not about_us:
            abort(404, description="About Us not found")
        response = {
            'id': about_us.id,
            'mission_statement': about_us.mission_statement,
            'vision_statement': about_us.vision_statement,
            'history': about_us.history
        }
        return jsonify(response)
    except Exception as e:
        print(e)
        abort(HTTP_500_INTERNAL_SERVER_ERROR, description="Error fetching About Us data")

@about.route('/register', methods=['POST'])
@jwt_required()
@admin_required
def create_about_us():
    data = request.get_json()
    try:
        existing_about_us = AboutUs.query.first()
        if existing_about_us:
            abort(400, description="About Us already exists")

        new_about_us = AboutUs(
            mission_statement=data['mission_statement'],
            vision_statement=data['vision_statement'],
            history=data.get('history', '')
        )
        db.session.add(new_about_us)
        db.session.commit()
        return jsonify({'message': 'About Us created successfully'}), HTTP_201_CREATED
    except Exception as e:
        print(e)
        db.session.rollback()
        abort(HTTP_500_INTERNAL_SERVER_ERROR, description="Error creating About Us data")

@about.route('/get/<int:id>', methods=['PUT'])
@jwt_required()
@admin_required
def update_about_us(id):
    data = request.get_json()
    try:
        about_us = AboutUs.query.get(id)
        if not about_us:
            abort(404, description="About Us not found")

        about_us.mission_statement = data['mission_statement']
        about_us.vision_statement = data['vision_statement']
        about_us.history = data.get('history', about_us.history)
        db.session.commit()
        return jsonify({'message': 'About Us updated successfully'})
    except Exception as e:
        print(e)
        db.session.rollback()
        abort(HTTP_500_INTERNAL_SERVER_ERROR, description="Error updating About Us data")

@about.route('/delete/<int:id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_about_us(id):
    try:
        about_us = AboutUs.query.get(id)
        if not about_us:
            abort(404, description="About Us not found")
        db.session.delete(about_us)
        db.session.commit()
        return jsonify({'message': 'About Us deleted successfully'})
    except Exception as e:
        print(e)
        db.session.rollback()
        abort(HTTP_500_INTERNAL_SERVER_ERROR, description="Error deleting About Us data")
