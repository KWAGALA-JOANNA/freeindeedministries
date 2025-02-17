from FIMAPP.extensions import db
from datetime import datetime


class Ministry(db.Model):
    __tablename__ = 'ministries'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    ministry_posts = db.relationship('MinistryPost', backref='ministries', lazy=True)


    def __init__(self, title, content, user_id):
        super(User, self).__init__()
        self.name = name
        self.description = description
        self.creator_id = creator_id
        
        
    def __repr__(self):
        return f"{self.title} {self.description}"
    
    
    
    
#     def serialize(self):
#         return {
#             'id': self.id,
#             'name': self.name,
#             'description': self.description,
#             'creator_id': self.creator_id
#         }

# def create_group(user_id, data):
#     user = User.query.get_or_404(user_id)
#     new_group = Group(
#         name=data['name'],
#         description=data['description'],
#         creator=user
#     )
#     db.session.add(new_group)
#     db.session.commit()
#     return new_group

# def get_group(group_id):
#     return Group.query.get_or_404(group_id)

# def update_group(group_id, data):
#     group = Group.query.get_or_404(group_id)
#     for key, value in data.items():
#         setattr(group, key, value)
#     db.session.commit()
#     return group

# def delete_group(group_id):
#     group = Group.query.get_or_404(group_id)
#     db.session.delete(group)
#     db.session.commit()

# @app.route('/groups', methods=['POST'])
# def create_group_route():
#     user_id = request.json['user_id']
#     data = request.get_json()
#     group = create_group(user_id, data)
#     return jsonify(group.id), 201

# @app.route('/groups/<int:group_id>', methods=['GET'])
# def get_group_route(group_id):
#     group = get_group(group_id)
#     return jsonify(group.serialize())

# @app.route('/groups/<int:group_id>', methods=['PUT'])
# def update_group_route(group_id):
#     data = request.get_json()
#     group = update_group(group_id, data)
#     return jsonify(group.serialize())

# @app.route('/groups/<int:group_id>', methods=['DELETE'])
# def delete_group_route(group_id):
#     delete_group(group_id)
#     return '', 204
