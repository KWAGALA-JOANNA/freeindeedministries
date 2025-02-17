from FIMAPP.extensions import db
from datetime import datetime


class Devotional(db.Model):
    __tablename__ = 'devotionals'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __init__(self, title, content, created_by):
        super(User, self).__init__()
        self.title = title
        self.content = content
       
        
        
    def __repr__(self):
        return f"{self.title} {self.content}"
    
    

   