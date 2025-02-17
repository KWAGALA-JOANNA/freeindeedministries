from flask import Flask, request, jsonify
from FIMAPP.extensions import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)


class Message(db.Model):
    __tablename__ = 'messages'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    contact = db.Column(db.Integer, nullable=False, unique=True)
    message = db.Column(db.String(255), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    

    def __init__(self, name, email, contact, message,  created_by):
        super(User, self).__init__()
        self.name = name
        self.email = email
        self.contact = contact
        self.message = message
        self.end_time = end_time
        self.user_id = user_id
        
        
    def __repr__(self):
        return f"{self.name} {self.message}"
    
    