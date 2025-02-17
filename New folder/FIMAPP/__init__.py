from flask import Flask, Blueprint, render_template, redirect, url_for, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS 
from FIMAPP.extensions import db, migrate, bcrypt, jwt, mail
from FIMAPP.controllers.team.team import team
from FIMAPP.controllers.about.about import about
from FIMAPP.controllers.user.user import user
from FIMAPP.controllers.ministry_post.ministry_post import ministry_post
from FIMAPP.controllers.prayer_request.prayer import prayer
from FIMAPP.controllers.contact_form.contact_form import message_api
from FIMAPP.controllers.comment.comment import comment_api
from FIMAPP.controllers.devotional.devotional import devotionals_api
from FIMAPP.controllers.events.event import event_api
from FIMAPP.controllers.ministry.ministry import ministry_api
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity, JWTManager

# Setting up an application factory function and everything must be within the function
def create_app():
    app = Flask(__name__)
    CORS(app)
    
      #  initialising JWTManager with secret key
    app.config['SECRET_KEY'] = 'A0703b91L08e9K9JV'
    jwt = JWTManager(app)

    #importing the Config class
    app.config.from_object('config.Config')
    

    
    # Initialising the third-party libraries. we pass in the app and db
    db.init_app (app) 
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    mail.init_app(app)
    
    app.config['JWT_SECRET_KEY'] = 'HS256'
    jwt.init_app(app)
    
    # working with migrations
    
    # importing and registering models
    from FIMAPP.models.user import User
    from FIMAPP.models.prayer_request import PrayerRequest
    from FIMAPP.models.ministry import Ministry
    from FIMAPP.models.ministry_post import MinistryPost
    from FIMAPP.models.event import Event
    from FIMAPP.models.donations import Donation
    from FIMAPP.models.devotionals import Devotional
    from FIMAPP.models.contact_form import Message
    from FIMAPP.models.comment import Comment
    from FIMAPP.models.team import TeamMember
    from FIMAPP.models.about import AboutUs
   
    
    
  # registering blueprints
   
    app.register_blueprint(user)
    app.register_blueprint(message_api)
    app.register_blueprint(prayer)
    app.register_blueprint(ministry_api)
    app.register_blueprint(ministry_post)
    app.register_blueprint(event_api)
    app.register_blueprint(comment_api)
    app.register_blueprint(about)
    app.register_blueprint(team)
    app.register_blueprint(devotionals_api)
    
    @app.route('/protected')
    @jwt_required()
    def protected():
        current_user_id = get_jwt_identity()
        return jsonify(logged_in_as=current_user_id), 200
    
   

    return app

    

