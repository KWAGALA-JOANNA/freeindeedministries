from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from FIMAPP.extensions import db
from FIMAPP.models.devotionals import Devotional
from FIMAPP.models.user import User


devotionals_api = Blueprint('devotionals', __name__)

def is_admin():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return user and user.user_type == 'admin'

@devotionals_api.route('/devotionals', methods=['POST'])
@jwt_required()
def create_devotional():
    if not is_admin():
        return jsonify({'error': 'Permission denied'}), 403

    try:
        data = request.get_json()
        title = data.get('title')
        content = data.get('content')
        created_by = get_jwt_identity()

        if not title or not content:
            return jsonify({'error': 'Title and content are required'}), 400

        new_devotional = Devotional(title=title, content=content, created_by=created_by)
        db.session.add(new_devotional)
        db.session.commit()

        return jsonify({'message': 'Devotional created successfully', 'devotional': {
            'id': new_devotional.id,
            'title': new_devotional.title,
            'content': new_devotional.content,
            'created_at': new_devotional.created_at,
            'created_by': new_devotional.created_by
        }}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@devotionals_api.route('/devotionals/<int:devotional_id>', methods=['GET'])
@jwt_required()
def get_devotional(devotional_id):
    if not is_admin():
        return jsonify({'error': 'Permission denied'}), 403

    try:
        devotional = Devotional.query.get(devotional_id)

        if not devotional:
            return jsonify({'error': 'Devotional not found'}), 404

        return jsonify({
            'id': devotional.id,
            'title': devotional.title,
            'content': devotional.content,
            'created_at': devotional.created_at,
            'created_by': devotional.created_by
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@devotionals_api.route('/devotionals/<int:devotional_id>', methods=['PUT'])
@jwt_required()
def update_devotional(devotional_id):
    if not is_admin():
        return jsonify({'error': 'Permission denied'}), 403

    try:
        data = request.get_json()
        title = data.get('title')
        content = data.get('content')
        user_id = get_jwt_identity()

        devotional = Devotional.query.get(devotional_id)

        if not devotional:
            return jsonify({'error': 'Devotional not found'}), 404

        if title:
            devotional.title = title
        if content:
            devotional.content = content

        db.session.commit()

        return jsonify({'message': 'Devotional updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@devotionals_api.route('/devotionals/<int:devotional_id>', methods=['DELETE'])
@jwt_required()
def delete_devotional(devotional_id):
    if not is_admin():
        return jsonify({'error': 'Permission denied'}), 403

    try:
        devotional = Devotional.query.get(devotional_id)

        if not devotional:
            return jsonify({'error': 'Devotional not found'}), 404

        db.session.delete(devotional)
        db.session.commit()

        return jsonify({'message': 'Devotional deleted successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

