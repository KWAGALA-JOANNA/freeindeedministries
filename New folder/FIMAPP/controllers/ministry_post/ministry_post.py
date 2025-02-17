from flask import Blueprint, request, jsonify
from FIMAPP.models.ministry_post import MinistryPost, db
from FIMAPP.extensions import bcrypt
from flask_jwt_extended import jwt_required, get_jwt_identity
# from cryptography.fernet import Fernet, InvalidToken

# Create a blueprint
ministry_post = Blueprint('ministry_post', __name__, url_prefix='/api/v1/ministry_post')


# Importing status codes
from FIMAPP.status_codes import HTTP_400_BAD_REQUEST,HTTP_201_CREATED,HTTP_500_INTERNAL_SERVER_ERROR

# Define the create ministry_post_request endpoint
@ministry_post.route('/register', methods=["POST"])
@jwt_required()
def create_ministry_post_request():
    try:
        # Extract ministry_post_request data from the request JSON
        data = request.json
        title = data.get("title")
        content = data.get("content")
        user_id = get_jwt_identity()
       

        # Validate input data
        if not all([title, content]):
            return jsonify({'error': "All fields are required"}), HTTP_400_BAD_REQUEST
        
        # Check if the current user is an admin
        if current_user.user_type != 'admin':
            return jsonify({'error': 'Access denied'}), 403


        # Create a new instance of the ministry_post_request model
        new_ministry_post_request = ministry_post_request(
            title=title,
            content=content,
            user_id=user_id,
           
        )

        # Add the new ministry_post_request instance to the database session
        db.session.add(new_ministry_post_request)

        # Commit the session to save the changes to the database
        db.session.commit()

        # Return a success response
        return jsonify({'message': f"ministry_post_request '{new_ministry_post_request.title}', ID'{new_ministry_post_request.id}' has been created successfully", 
                        'ministry_post_request':{
                            'id':new_ministry_post_request.id,
                            'title': new_ministry_post_request.title,
                            'content': new_ministry_post_request.content,
                            'user_id': new_ministry_post_request.user_id,
                            }

            
            }), HTTP_201_CREATED

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR
    
    
    

# Define the get ministry_post_request endpoint
@ministry_post.route('/get/<int:ministry_post_request_id>', methods=["GET"])
def get_ministry_post_request(ministry_post_request_id):
    try:
        # querying the ministry_post_request by ministry_post_request_id to get a specific ministry_post_request
        ministry_post_request = ministry_post_request.query.get(ministry_post_request_id)
        if not ministry_post_request:
            return jsonify({'error': 'ministry_post_request not found'}), 404

        return jsonify({'message': 'ministry_post_request obtained successfully', 'ministry_post_request_id': ministry_post_request_id}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Define the update ministry_post_request endpoint
@ministry_post.route('/edit/<int:ministry_post_request_id>', methods=["PUT"])
def update_ministry_post_request(ministry_post_request_id):
    try:
        # Extract ministry_post_request data from the request JSON
        data = request.json
        ministry_post_request = ministry_post_request.query.get(ministry_post_request_id)
        if not ministry_post_request:
            return jsonify({'error': 'ministry_post_request not found'}), 404

        # Update ministry_post_request fields if provided in the request
        for key, value in data.items():
            setattr(ministry_post_request, key, value)

        # Commit the session to save the changes to the database
        db.session.commit()

        # Return a success response
        return jsonify({'message': 'ministry_post_request updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Define the delete ministry_post_request endpoint
@ministry_post.route('/delete/<int:ministry_post_request_id>', methods=["DELETE"])
@jwt_required()
def delete_ministry_post_request(ministry_post_request_id):
    
    try:
        ministry_post_request_id = ministry_post_request.query.filter_by(id=id).first()
        
        if not ministry_post_request_id:
            return jsonify({'error': 'ministry_post_request not found'})
        else:
            db.session.delete(ministry_post_request_id)
            db.session.commit()

        return jsonify({'message': 'ministry_post_request deleted successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR
