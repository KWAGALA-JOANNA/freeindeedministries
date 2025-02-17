from FIMAPP.extensions import db
from datetime import datetime

class PrayerRequest(db.Model):
    __tablename__ ='prayer_requests'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


    def __init__(self, title, content, user_id):
        super(User, self).__init__()
        self.title = title
        self.content = content
        self.user_id = user_id
        
        
    def __repr__(self):
            return f"<prayer_request(name='{self.title}', origin='{self.user_id}')>"



