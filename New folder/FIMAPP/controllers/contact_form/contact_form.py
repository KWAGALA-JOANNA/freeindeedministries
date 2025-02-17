from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from FIMAPP.extensions import db
from FIMAPP.models.user import User
from FIMAPP.models.login_history import LoginHistory
from FIMAPP.models.contact_form import Message
from datetime import datetime

message_api = Blueprint('messages', __name__, url_prefix='/api/v1/messages')

@message_api.route('/', methods=['POST'])
@jwt_required()
def create_message():
    try:
        data = request.json
        user_id = get_jwt_identity()

        if not all(field in data for field in ["name", "email", "contact", "message"]):
            return jsonify({'error': 'All fields are required'}), 400

        new_message = Message(
            name=data['name'],
            email=data['email'],
            contact=data['contact'],
            message=data['message'],
            user_id=user_id
        )

        db.session.add(new_message)
        db.session.commit()

        return jsonify({'message': 'Message sent successfully'}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@message_api.route('/getall', methods=['GET'])
@jwt_required()
def get_messages():
    try:
        messages = Message.query.all()
        serialized_messages = [
            {
                'id': message.id,
                'name': message.name,
                'email': message.email,
                'contact': message.contact,
                'message': message.message,
                'user_id': message.user_id,
                'created_at': message.created_at
            }
            for message in messages
        ]

        return jsonify({'messages': serialized_messages}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@message_api.route('/getbyid', methods=['GET'])
@jwt_required()
def get_message(message_id):
    try:
        message = Message.query.get_or_404(message_id)

        serialized_message = {
            'id': message.id,
            'name': message.name,
            'email': message.email,
            'contact': message.contact,
            'message': message.message,
            'user_id': message.user_id,
            'created_at': message.created_at
        }

        return jsonify({'message': serialized_message}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@message_api.route('/update', methods=['PUT'])
@jwt_required()
def update_message(message_id):
    try:
        data = request.json
        message = Message.query.get_or_404(message_id)

        for field in ["name", "email", "contact", "message"]:
            if field in data:
                setattr(message, field, data[field])

        db.session.commit()

        return jsonify({'message': 'Message updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@message_api.route('/delete', methods=['DELETE'])
@jwt_required()
def delete_message(message_id):
    try:
        message = Message.query.get_or_404(message_id)

        db.session.delete(message)
        db.session.commit()

        return jsonify({'message': 'Message deleted successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Additional Routes for User Activity

activity_api = Blueprint('activities', __name__, url_prefix='/api/v1/activities')

@activity_api.route('/track', methods=['POST'])
@jwt_required()
def track_activity():
    try:
        data = request.json
        user_id = get_jwt_identity()

        new_activity = UserActivity(
            user_id=user_id,
            page=data['page'],
            action=data['action'],
            timestamp=datetime.utcnow()
        )

        db.session.add(new_activity)
        db.session.commit()

        return jsonify({'message': 'Activity tracked successfully'}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@activity_api.route('/', methods=['GET'])
@jwt_required()
def get_activities():
    try:
        activities = UserActivity.query.all()
        serialized_activities = [
            {
                'id': activity.id,
                'user_id': activity.user_id,
                'page': activity.page,
                'action': activity.action,
                'timestamp': activity.timestamp
            }
            for activity in activities
        ]

        return jsonify({'activities': serialized_activities}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
