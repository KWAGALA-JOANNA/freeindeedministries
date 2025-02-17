from FIMAPP.extensions import db
from datetime import datetime

class MinistryPost(db.Model):
    __tablename__ = 'ministry_posts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    ministry_id = db.Column(db.Integer, db.ForeignKey('ministries.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    def __init__(self, title, content, user_id):
        super(User, self).__init__()
        self.title = title
        self.content = content
        self.user_id = user_id
        self.ministry_id = ministry_id
        
        
    def __repr__(self):
        return f"{self.title} {self.content}"
    

#     def serialize(self):
#         return {
#             'id': self.id,
#             'title': self.title,
#             'content': self.content,
#             'group_id': self.group_id,
# #             'user_id': self.user_id
#         }

# def create_group_post(group_id, user_id, data):
#     group = Group.query.get_or_404(group_id)
#     user = User.query.get_or_404(user_id)
#     new_group_post = GroupPost(
#         title=data['title'],
#         content=data['content'],
#         group=group,
#         author=user
#     )
#     db.session.add(new_group_post)
#     db.session.commit()
#     return new_group_post

# def get_group_post(group_post_id):
#     return GroupPost.query.get_or_404(group_post_id)

# def update_group_post(group_post_id, data):
#     group_post = GroupPost.query.get_or_404(group_post_id)
#     for key, value in data.items():
#         setattr(group_post, key, value)
#     db.session.commit()
#     return group_post

# def delete_group_post(group_post_id):
#     group_post = GroupPost.query.get_or_404(group_post_id)
#     db.session.delete(group_post)
#     db.session.commit()

# @app.route('/group_posts', methods=['POST'])
# def create_group_post_route():
#     group_id = request.json['group_id']
#     user_id = request.json['user_id']
#     data = request.get_json()
#     group_post = create_group_post(group_id, user_id, data)
#     return jsonify(group_post.id), 201

# @app.route('/group_posts/<int:group_post_id>', methods=['GET'])
# def get_group_post_route(group_post_id):
#     group_post = get_group_post(group_post_id)
#     return jsonify(group_post.serialize())

# @app.route('/group_posts/<int:group_post_id>', methods=['PUT'])
# def update_group_post_route(group_post_id):
#     data = request.get_json()
#     group_post = update_group_post(group_post_id, data)
#     return jsonify(group_post.serialize())

# @app.route('/group_posts/<int:group_post_id>', methods=['DELETE'])
# def delete_group_post_route(group_post_id):
#     delete_group_post(group_post_id)
#     return '', 204
