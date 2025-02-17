from FIMAPP.extensions import db
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey('comments.id'), nullable=True)
    replies = db.relationship('Comment', backref=db.backref('parent', remote_side=[id]), lazy='dynamic')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    ministry_id = db.Column(db.Integer, db.ForeignKey('ministry_posts.id'), nullable=False)
    
    
    def __init__(self, content, user_id, post_id):
        super(User, self).__init__()
        self.content = content
        self.user_id = user_id
        self.ministry_id = ministry_id
        self.parent_id = parent_id
        
        
    def __repr__(self):
        return f"{self.name} "
    
    
    

