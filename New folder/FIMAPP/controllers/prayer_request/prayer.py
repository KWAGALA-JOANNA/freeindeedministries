from flask import Blueprint, request, jsonify
from FIMAPP.models.prayer_request import PrayerRequest, db
from FIMAPP.extensions import bcrypt
from flask_jwt_extended import jwt_required, get_jwt_identity
from FIMAPP.status_codes import HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_500_INTERNAL_SERVER_ERROR
from FIMAPP.models.user import User  # Assuming there is a User model

# Create a blueprint
prayer = Blueprint('prayer', __name__, url_prefix='/api/v1/prayer_requests')

# Define the create prayer_request endpoint
@prayer.route('/register', methods=["POST"])
@jwt_required()
def create_prayer_request():
    try:
        # Extract prayer_request data from the request JSON
        data = request.json
        title = data.get("title")
        content = data.get("content")
        user_id = get_jwt_identity()

        # Validate input data
        if not all([title, content]):
            return jsonify({'error': "All fields are required"}), HTTP_400_BAD_REQUEST

        # Create a new instance of the prayer_request model
        new_prayer_request = PrayerRequest(
            title=title,
            content=content,
            user_id=user_id,
        )

        # Add the new prayer_request instance to the database session
        db.session.add(new_prayer_request)

        # Commit the session to save the changes to the database
        db.session.commit()

        # Return a success response
        return jsonify({'message': f"Prayer request '{new_prayer_request.title}', ID '{new_prayer_request.id}' has been created successfully", 
                        'prayer_request': {
                            'id': new_prayer_request.id,
                            'title': new_prayer_request.title,
                            'content': new_prayer_request.content,
                            'user_id': new_prayer_request.user_id,
                        }
                        }), HTTP_201_CREATED

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

# Define the get prayer_request endpoint
@prayer.route('/get/<int:prayer_request_id>', methods=["GET"])
@jwt_required()
def get_prayer_request(prayer_request_id):
    try:
        # Query the prayer request by prayer_request_id to get a specific prayer request
        prayer_request = PrayerRequest.query.get(prayer_request_id)
        if not prayer_request:
            return jsonify({'error': 'Prayer request not found'}), 404

        # Get the current user identity
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)

        # Check if the current user is an admin or the user of the prayer request
        if current_user.isadmin != True:
            return jsonify({'error': 'Access denied'}), 403

        return jsonify({
            'message': 'Prayer request obtained successfully',
            'prayer_request': {
                'id': prayer_request.id,
                'title': prayer_request.title,
                'content': prayer_request.content,
                'user_id': prayer_request.user_id,
            }
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Define the update prayer_request endpoint
@prayer.route('/edit/<int:prayer_request_id>', methods=["PUT"])
@jwt_required()
def update_prayer_request(prayer_request_id):
    try:
        # Extract prayer_request data from the request JSON
        data = request.json

        # Query the prayer request by prayer_request_id to get a specific prayer request
        prayer_request = PrayerRequest.query.get(prayer_request_id)
        if not prayer_request:
            return jsonify({'error': 'Prayer request not found'}), 404

        # Get the current user identity
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)

        # Check if the current user is the user of the prayer request
        if prayer_request.user_id != current_user.id:
            return jsonify({'error': 'Access denied'}), 403

        # Update prayer request fields if provided in the request
        for key, value in data.items():
            setattr(prayer_request, key, value)

        # Commit the session to save the changes to the database
        db.session.commit()

        # Return a success response
        return jsonify({'message': 'Prayer request updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Define the delete prayer_request endpoint
@prayer.route('/delete/<int:prayer_request_id>', methods=["DELETE"])
@jwt_required()
def delete_prayer_request(prayer_request_id):
    try:
        # Get the current user identity
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)

        # Check if the current user is an admin
        if current_user.isadmin != True:
            return jsonify({'error': 'Access denied'}), 403

        # Query the prayer request by prayer_request_id to get a specific prayer request
        prayer_request = PrayerRequest.query.get(prayer_request_id)

        if not prayer_request:
            return jsonify({'error': 'Prayer request not found'}), 404

        # Delete the prayer request
        db.session.delete(prayer_request)
        db.session.commit()

        return jsonify({'message': 'Prayer request deleted successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


