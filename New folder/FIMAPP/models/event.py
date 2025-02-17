from FIMAPP.extensions import db
from datetime import datetime

class Event(db.Model):
    __tablename__ = 'events'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    location = db.Column(db.String(200))
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    image_url = db.Column(db.String(200), nullable=False)  #store image URL

    def __init__(self, title, description, location, start_time, end_time, created_by, image_url=None):
        self.title = title
        self.description = description
        self.location = location
        self.start_time = start_time
        self.end_time = end_time
        self.created_by = created_by
        self.completed = False
        self.image_url = image_url

    def __repr__(self):
        return f"{self.title} {self.description}"
