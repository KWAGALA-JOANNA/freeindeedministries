from FIMAPP.extensions import db
from datetime import datetime


class TeamMember(db.Model):
    __tablename__ = 'team_members'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    position = db.Column(db.String(100), nullable=False)
    bio = db.Column(db.Text, nullable=True)
    image_url = db.Column(db.String(255), nullable=True)
    
    about_us_id = db.Column(db.Integer, db.ForeignKey('about_us.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False) 
    
    
    def __init__(self, name, position,  image_url):
        super(TeamMember, self).__init__()
        self.name = name
        self.position = position
        self.image_url = image_url
        