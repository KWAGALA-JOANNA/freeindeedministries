from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from FIMAPP.extensions import db
from FIMAPP.models.user import User
from FIMAPP.models.comment import Comment

comment_api = Blueprint('comments', __name__, url_prefix='/api/v1/comments')

@comment_api.route('/', methods=['POST'])
@jwt_required()
def create_comment():
    try:
        data = request.json
        user_id = get_jwt_identity()
        
        if not all(field in data for field in ["content", "ministry_id"]):
            return jsonify({'error': 'All fields are required'}), 400
        
        new_comment = Comment(
            content=data['content'],
            user_id=user_id,
            ministry_id=data['ministry_id'],
            parent_id=data.get('parent_id')  # This can be None for root comments
        )
        
        db.session.add(new_comment)
        db.session.commit()
        
        return jsonify({'message': 'Comment created successfully', 'comment': new_comment.serialize()}), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@comment_api.route('/', methods=['GET'])
def get_comments():
    try:
        comments = Comment.query.filter_by(parent_id=None).all()  # Get only root comments
        serialized_comments = [comment.serialize() for comment in comments]
        
        return jsonify({'comments': serialized_comments}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@comment_api.route('/<int:comment_id>', methods=['GET'])
def get_comment(comment_id):
    try:
        comment = Comment.query.get_or_404(comment_id)
        return jsonify({'comment': comment.serialize()}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@comment_api.route('/<int:comment_id>', methods=['PUT'])
@jwt_required()
def update_comment(comment_id):
    try:
        data = request.json
        comment = Comment.query.get_or_404(comment_id)
        user_id = get_jwt_identity()
        
        if comment.user_id != user_id:
            return jsonify({'error': 'You can only edit your own comments'}), 403
        
        if 'content' in data:
            comment.content = data['content']
        
        db.session.commit()
        
        return jsonify({'message': 'Comment updated successfully', 'comment': comment.serialize()}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@comment_api.route('/<int:comment_id>', methods=['DELETE'])
@jwt_required()
def delete_comment(comment_id):
    try:
        comment = Comment.query.get_or_404(comment_id)
        user_id = get_jwt_identity()
        current_user = User.query.get_or_404(user_id)
        
        if current_user.user_type != 'admin':
            return jsonify({'error': 'Only admins can delete comments'}), 403
        
        db.session.delete(comment)
        db.session.commit()
        
        return jsonify({'message': 'Comment deleted successfully'}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500



