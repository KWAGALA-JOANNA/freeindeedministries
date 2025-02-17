from flask import Flask, Blueprint, request, jsonify
# from FIMAPP.models.team import TeamMember, db
from FIMAPP.models.team import TeamMember
from FIMAPP.extensions import bcrypt
from flask_jwt_extended import jwt_required, get_jwt_identity
from FIMAPP.status_codes import HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_500_INTERNAL_SERVER_ERROR
from datetime import datetime
from functools import wraps



team = Blueprint('team', __name__, url_prefix='/api/v1/team')

# Admin check decorator
def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        current_user = get_jwt_identity()
        if not current_user.get('is_admin'):
            abort(403, description="Admin access required")
        return fn(*args, **kwargs)
    return wrapper

@team.route('/get_team_members', methods=['GET'])
@jwt_required()
@admin_required
def get_team_members():
    try:
        team_members = TeamMember.query.all()
        response = [
            {
                'id': member.id,
                'name': member.name,
                'position': member.position,
                'bio': member.bio,
                'image_url': member.image_url,
                'about_us_id': member.about_us_id
            } for member in team_members
        ]
        return jsonify(response)
    except Exception as e:
        print(e)
        abort(HTTP_500_INTERNAL_SERVER_ERROR, description="Error fetching team members")

@team.route('/get/<int:id>', methods=['GET'])
@jwt_required()
@admin_required
def get_team_member(id):
    try:
        member = TeamMember.query.get(id)
        if not member:
            abort(404, description="Team member not found")
        response = {
            'id': member.id,
            'name': member.name,
            'position': member.position,
            'bio': member.bio,
            'image_url': member.image_url,
            'about_us_id': member.about_us_id
        }
        return jsonify(response)
    except Exception as e:
        print(e)
        abort(HTTP_500_INTERNAL_SERVER_ERROR, description="Error fetching team member")

@team.route('/register', methods=['POST'])
@jwt_required()
@admin_required
def add_team_member():
    data = request.get_json()
    try:
        new_member = TeamMember(
            name=data['name'],
            position=data['position'],
            image_url=data.get('image_url', ''),
            bio=data.get('bio', ''),
            about_us_id=data['about_us_id']
        )
        db.session.add(new_member)
        db.session.commit()
        return jsonify({'message': 'Team member added successfully'}), HTTP_201_CREATED
    except Exception as e:
        print(e)
        db.session.rollback()
        abort(HTTP_500_INTERNAL_SERVER_ERROR, description="Error adding team member")

@team.route('/update/<int:id>', methods=['PUT'])
@jwt_required()
@admin_required
def update_team_member(id):
    data = request.get_json()
    try:
        member = TeamMember.query.get(id)
        if not member:
            abort(404, description="Team member not found")
        member.name = data['name']
        member.position = data['position']
        member.bio = data.get('bio', member.bio)
        member.image_url = data.get('image_url', member.image_url)
        db.session.commit()
        return jsonify({'message': 'Team member updated successfully'})
    except Exception as e:
        print(e)
        db.session.rollback()
        abort(HTTP_500_INTERNAL_SERVER_ERROR, description="Error updating team member")

@team.route('/delete/<int:id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_team_member(id):
    try:
        member = TeamMember.query.get(id)
        if not member:
            abort(404, description="Team member not found")
        db.session.delete(member)
        db.session.commit()
        return jsonify({'message': 'Team member deleted successfully'})
    except Exception as e:
        print(e)
        db.session.rollback()
        abort(HTTP_500_INTERNAL_SERVER_ERROR, description="Error deleting team member")