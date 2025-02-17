from FIMAPP.extensions import db
from datetime import datetime

class AboutUs(db.Model):
    __tablename__ = 'about_us'

    id = db.Column(db.Integer, primary_key=True)
    mission_statement = db.Column(db.Text, nullable=False)
    vision_statement = db.Column(db.Text, nullable=False)
    history = db.Column(db.Text, nullable=True)
    
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    team_members = db.relationship('TeamMember', backref='about_us', lazy=True)

    def __init__(self, mission, vision,  history):
        super(AboutUs, self).__init__()
        self.mission = mission
        self.vision = vision
        self.history = history
    