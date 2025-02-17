from flask import Blueprint, request, jsonify
from FIMAPP.models.ministry import Ministry, db
from FIMAPP.extensions import bcrypt
from flask_jwt_extended import jwt_required, get_jwt_identity
# from cryptography.fernet import Fernet, InvalidToken

# Create a blueprint
ministry_api = Blueprint('ministry_api', __name__, url_prefix='/api/v1/ministry_api')


# Importing status codes
from FIMAPP.status_codes import HTTP_400_BAD_REQUEST,HTTP_201_CREATED,HTTP_500_INTERNAL_SERVER_ERROR

# Define the create ministry_api_request endpoint
@ministry_api.route('/register', methods=["POST"])
@jwt_required()
def create_ministry_api_request():
    try:
        # Extract ministry_api_request data from the request JSON
        data = request.json
        title = data.get("title")
        content = data.get("content")
        user_id = get_jwt_identity()
       

        # Validate input data
        if not all([title, content]):
            return jsonify({'error': "All fields are required"}), HTTP_400_BAD_REQUEST

        # Create a new instance of the ministry_api_request model
        new_ministry_api_request = ministry_api_request(
            title=title,
            content=content,
            user_id=user_id,
           
        )

        # Add the new ministry_api_request instance to the database session
        db.session.add(new_ministry_api_request)

        # Commit the session to save the changes to the database
        db.session.commit()

        # Return a success response
        return jsonify({'message': f"ministry_api_request '{new_ministry_api_request.title}', ID'{new_ministry_api_request.id}' has been created successfully", 
                        'ministry_api_request':{
                            'id':new_ministry_api_request.id,
                            'title': new_ministry_api_request.title,
                            'content': new_ministry_api_request.content,
                            'user_id': new_ministry_api_request.user_id,
                            }

            
            }), HTTP_201_CREATED

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR
    
    
    

# Define the get ministry_api_request endpoint
@ministry_api.route('/get/<int:ministry_api_request_id>', methods=["GET"])
def get_ministry_api_request(ministry_api_request_id):
    try:
        # querying the ministry_api_request by ministry_api_request_id to get a specific ministry_api_request
        ministry_api_request = ministry_api_request.query.get(ministry_api_request_id)
        if not ministry_api_request:
            return jsonify({'error': 'ministry_api_request not found'}), 404

        return jsonify({'message': 'ministry_api_request obtained successfully', 'ministry_api_request_id': ministry_api_request_id}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Define the update ministry_api_request endpoint
@ministry_api.route('/edit/<int:ministry_api_request_id>', methods=["PUT"])
def update_ministry_api_request(ministry_api_request_id):
    try:
        # Extract ministry_api_request data from the request JSON
        data = request.json
        ministry_api_request = ministry_api_request.query.get(ministry_api_request_id)
        if not ministry_api_request:
            return jsonify({'error': 'ministry_api_request not found'}), 404

        # Update ministry_api_request fields if provided in the request
        for key, value in data.items():
            setattr(ministry_api_request, key, value)

        # Commit the session to save the changes to the database
        db.session.commit()

        # Return a success response
        return jsonify({'message': 'ministry_api_request updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Define the delete ministry_api_request endpoint
@ministry_api.route('/delete/<int:ministry_api_request_id>', methods=["DELETE"])
@jwt_required()
def delete_ministry_api_request(ministry_api_request_id):
    
    try:
        ministry_api_request_id = ministry_api_request.query.filter_by(id=id).first()
        
        if not ministry_api_request_id:
            return jsonify({'error': 'ministry_api_request not found'})
        else:
            db.session.delete(ministry_api_request_id)
            db.session.commit()

        return jsonify({'message': 'ministry_api_request deleted successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR
