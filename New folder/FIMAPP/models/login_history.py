from flask import Flask, request, jsonify
from FIMAPP.extensions import db
from datetime import datetime
import os
from werkzeug.security import generate_password_hash, check_password_hash


class LoginHistory(db.Model):
    __tablename__ = 'login_history'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    login_time = db.Column(db.DateTime, nullable=False)
    logout_time = db.Column(db.DateTime, nullable=True)
    ip_address = db.Column(db.String(45), nullable=True)
    location = db.Column(db.String(200), nullable=True)
    
    
    def __init__(self, login_time, logout_time,  ip_address, location):
        self.login_time = login_time
        self.logout_time = logout_time
        self.ip_address = ip_address
        self.location = location
        