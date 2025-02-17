from flask import Flask, request, jsonify
from FIMAPP.extensions import db, bcrypt
from datetime import datetime



class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    contact_number = db.Column(db.String(10), nullable=False, unique=True)
    church = db.Column(db.String(150), nullable=True)  # Church affiliation
    date_of_birth = db.Column(db.Date, nullable=True)
    is_admin = db.Column(db.Boolean, default=False, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, onupdate=datetime.now())

    # Relationships
    login_history = db.relationship('LoginHistory', backref='user', lazy=True)
    contact_form = db.relationship('Message', backref='users', lazy=True)
    comment = db.relationship('Comment', backref='users', lazy=True)
    event = db.relationship('Event', backref='users', lazy=True)
    ministry = db.relationship('Ministry', backref='users', lazy=True)
    ministry_posts = db.relationship('MinistryPost', backref='users', lazy=True)
    prayer_requests = db.relationship('PrayerRequest', backref='users', lazy=True)
    devotionals = db.relationship('Devotional', backref='users', lazy=True)
    donations = db.relationship('Donation', backref='users', lazy=True)
    about = db.relationship('AboutUs', backref='users', lazy=True)

    def __init__(self, fullname, email, password, contact_number, date_of_birth=None, church=None, is_admin=False):
        super(User, self).__init__()
        self.fullname = fullname
        self.email = email
        self.password = password
        self.contact_number = contact_number
        self.date_of_birth = date_of_birth
        self.church = church
        self.is_admin = is_admin

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def get_full_name(self):
        return self.name

    def get_full_name(self):
        """Return the user's full name."""
        return self.fullname

    def __repr__(self):
        return f"<User {self.fullname}>"

    @classmethod
    def check_and_update_role(cls, email, password):
        """
        Check if the user logging in has admin credentials and update their role.
        Admin credentials are hardcoded for demonstration purposes.
        """
        if email == 'freeindeedministriesrivers@gmail.com' and password == 'FIMadmin@5464.org':
            user = cls.query.filter_by(email=email).first()
            if user:
                user.is_admin = True
                db.session.commit()
                return True
        return False

    @staticmethod
    def is_strong_password(password):
        """Validate if the password is strong enough."""
        return len(password) >= 7
