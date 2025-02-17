from flask import Flask, Blueprint, request, jsonify
from FIMAPP.models.event import Event, db
from FIMAPP.models.user import User
from FIMAPP.extensions import bcrypt
from flask_jwt_extended import jwt_required, get_jwt_identity
from FIMAPP.status_codes import HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_500_INTERNAL_SERVER_ERROR
from datetime import datetime
from functools import wraps

app = Flask(__name__)

event_api = Blueprint('events', __name__, url_prefix='/api/v1/events')

def admin_required(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        isadmin = get_jwt_identity()
        user = User.query.get(isadmin)
        if not user or not user.isadmin:
            return jsonify({'error': 'Admin access required'}), HTTP_403_FORBIDDEN
        return fn(*args, **kwargs)
    return wrapper

def serialize_event(event):
    return {
        'id': event.id,
        'title': event.title,
        'description': event.description,
        'location': event.location,
        'start': event.start_time.isoformat(),
        'end': event.end_time.isoformat(),
        'created_by': event.created_by,
        'completed': event.completed,
        'image_url': event.image_url
    }

@event_api.route('/register', methods=["POST"])
@admin_required
def create_event_request():
    try:
        data = request.form.to_dict()
        title = data.get("title")
        description = data.get("description")
        location = data.get("location")
        start_time = data.get("start_time")
        end_time = data.get("end_time")
        user_id = get_jwt_identity()
        image = request.files.get('image')

        if not all([title, description, location, start_time, end_time]):
            return jsonify({'error': "All fields are required"}), HTTP_400_BAD_REQUEST

        

        new_event = Event(
            title=title,
            description=description,
            location=location,
            start_time=datetime.strptime(start_time, '%Y-%m-%d %H:%M:%S'),
            end_time=datetime.strptime(end_time, '%Y-%m-%d %H:%M:%S'),
            created_by=user_id,
            image_url=image_url
        )

        db.session.add(new_event)
        db.session.commit()

        return jsonify({'message': f"Event '{new_event.title}', ID'{new_event.id}' has been created successfully", 
                        'event': serialize_event(new_event)}), HTTP_201_CREATED

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR
# Define the get all events endpoint
@event_api.route('/all', methods=["GET"])
@jwt_required()
def get_all_events():
    try:
        events = Event.query.all()
        events_data = [serialize_event(event) for event in events]
        return jsonify(events_data), 200

    except Exception as e:
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

# Define the get event endpoint
@event_api.route('/get/<int:event_id>', methods=["GET"])
@jwt_required()
def get_event_request(event_id):
    try:
        event = Event.query.get(event_id)
        if not event:
            return jsonify({'error': 'Event not found'}), 404

        return jsonify({'message': 'Event obtained successfully', 'event': serialize_event(event)}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

# Define the update event endpoint
@event_api.route('/edit/<int:event_id>', methods=["PUT"])
@admin_required
def update_event_request(event_id):
    try:
        data = request.json
        event = Event.query.get(event_id)
        if not event:
            return jsonify({'error': 'Event not found'}), 404

        for key, value in data.items():
            if key in ['start_time', 'end_time']:
                value = datetime.strptime(value, '%Y-%m-%d %H:%M:%S')
            setattr(event, key, value)

        db.session.commit()
        return jsonify({'message': 'Event updated successfully', 'event': serialize_event(event)}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

# Define the delete event endpoint
@event_api.route('/delete/<int:event_id>', methods=["DELETE"])
@admin_required
def delete_event_request(event_id):
    try:
        event = Event.query.get(event_id)
        if not event:
            return jsonify({'error': 'Event not found'}), 404

        db.session.delete(event)
        db.session.commit()
        return jsonify({'message': 'Event deleted successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

# Define the mark event as done endpoint
@event_api.route('/mark_done/<int:event_id>', methods=["PATCH"])
@admin_required
def mark_event_done(event_id):
    try:
        event = Event.query.get(event_id)
        if not event:
            return jsonify({'error': 'Event not found'}), 404

        event.completed = True
        db.session.commit()
        return jsonify({'message': 'Event marked as done', 'event': serialize_event(event)}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR
