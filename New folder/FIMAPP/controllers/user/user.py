
# from flask import jsonify, request, session, Blueprint
# from datetime import datetime
# import os, re, random, smtplib
# from email.message import EmailMessage
# from FIMAPP.models.user import User
# import scrypt
# import random
# from FIMAPP.extensions import bcrypt, jwt, db
# from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
# from dotenv import load_dotenv
# from datetime import datetime, timedelta
# # from nacl.pwhash import scrypt as nacl_scrypt
# from werkzeug.security import generate_password_hash, check_password_hash
# from werkzeug.utils import secure_filename



# # Load environment variables
# load_dotenv()

# # Environment variables for email
# EMAIL_USER = os.getenv('EMAIL_USER')
# EMAIL_PASS = os.getenv('EMAIL_PASS')


# # Blueprint setup
# user = Blueprint('user', __name__, url_prefix='/api/v1/user')

# # Secret key for encoding and decoding the token
# SECRET_KEY = 'A0703b91L08e9K9JV'

# DEFAULT_ADMIN_EMAIL = 'freeindeedministriesrivers@gmail.com'
# DEFAULT_ADMIN_PASSWORD = 'FIMadmin@5464.org'

# # Utility function to validate email format
# def validate_email_format(email):
#     email_pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
#     return re.match(email_pattern, email)

# def validate_password(password):
#     if len(password) < 8:
#         return "Password must have at least 8 characters."
#     if not re.search(r"[A-Z]", password):
#         return "Password must have at least one uppercase letter."
#     if not re.search(r"[0-9]", password):
#         return "Password must have at least one number."
#     if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
#         return "Password must have at least one special character."
#     return None


# def send_otp(email):
#     otp = ''.join([str(random.randint(0, 9)) for _ in range(6)])  # 6-digit OTP
#     session['otp'] = otp

#     msg = EmailMessage()
#     msg['Subject'] = 'OTP Verification'
#     msg['From'] = EMAIL_USER
#     msg['To'] = email
#     msg.set_content(f'Your OTP is: {otp}')

#     try:
#         with smtplib.SMTP('smtp.gmail.com', 587) as server:
#             server.starttls()
#             server.login(EMAIL_USER, EMAIL_PASS)
#             server.send_message(msg)
#             print("OTP sent successfully.")
#     except smtplib.SMTPAuthenticationError:
#         print("Failed to authenticate with the SMTP server. Check your credentials.")
#     except smtplib.SMTPConnectError:
#         print("Failed to connect to the SMTP server. Check your network connection and server address.")
#     except smtplib.SMTPException as e:
#         print(f"Failed to send OTP email: {str(e)}")




#     # Handle form data
#     form_data = request.form
#     data = {
#         "fullname": form_data.get('fullname'),
#         "email": form_data.get('email'),
#         "date_of_birth": form_data.get('date_of_birth'),
#         "password": form_data.get('password'),
#         "contact": form_data.get('contact'),
#         "church": form_data.get('church'),
#         # "role": form_data.get('role'),
#         # "image": file_path,
#         "is_admin": form_data.get('is_admin', 'false')
#     }

#     # Check for missing fields
#     required_fields = ["fullname", "email", "date_of_birth", "password", "contact", "church", "is_admin"]
#     missing_fields = [field for field in required_fields if not data.get(field)]
#     if missing_fields:
#         return jsonify({'error': f"Missing fields: {', '.join(missing_fields)}"}), 400

#     # Validate email format
#     if not validate_email_format(data["email"]):
#         return jsonify({'error': "Invalid email format"}), 400

#     # Check for existing email
#     if User.query.filter_by(email=data["email"]).first():
#         return jsonify({'error': "The email already exists"}), 400

#     # Validate password strength
#     password_validation_error = validate_password(data["password"])
#     if password_validation_error:
#         return jsonify({'error': password_validation_error}), 400

#     # Store registration data in session and send OTP
#     session['registration_data'] = data
#     send_otp(data["email"])

#     return jsonify({'message': 'OTP sent to your email. Please verify to complete registration.'}), 200


# @user.route('/verify_otp', methods=["POST"])
# def verify_otp():
#     input_otp = request.get_json().get("otp")
#     stored_otp = session.get('otp')
#     data = session.get('registration_data')

#     # Validate OTP
#     if input_otp != stored_otp:
#         return jsonify({'error': 'Invalid OTP'}), 400

#     try:
#         # Hash password using bcrypt
#         hashed_password = bcrypt.generate_password_hash(data["password"]).decode('utf-8')

#         # Convert is_admin to boolean
#         is_admin = data.get("is_admin", "false").lower() == "true"

#         # Create new user
#         new_user = User(
#             fullname=data["fullname"],
#             email=data["email"],
#             church=data["church"],
#             # role=data["role"],
#             contact=data["contact"],
#             date_of_birth=datetime.strptime(data["date_of_birth"], '%Y-%m-%d').date() if data["date_of_birth"] else None,
#             # image=data["image"],
#             is_admin=is_admin,
#             password=hashed_password
#         )

#         # Add and commit new user to the database
#         db.session.add(new_user)
#         db.session.commit()

#         # Generate access token for the new user
#         access_token = create_access_token(identity=new_user.id)

#         # Clear session data
#         session.pop('otp', None)
#         session.pop('registration_data', None)

#         # Return success message with access token and user info
#         return jsonify({
#             'message': 'User created successfully',
#             'access_token': access_token,
#             'user': {
#                 'id': new_user.id,
#                 'email': new_user.email,
#                 'username': new_user.fullname,
#                 'is_admin': new_user.is_admin
#             }
#         }), 201

#     except Exception as e:
#         db.session.rollback()
#         return jsonify({'error': str(e)}), 500
# # @user.route('/resend_otp', methods=["POST"])
# # def resend_otp():
# #     data = request.get_json()
# #     email = data.get("email")

# #     if not email:
# #         return jsonify({'error': 'Email is required'}), 400

# #     # Check if the email exists in the database
# #     if not User.query.filter_by(email=email).first():
# #         return jsonify({'error': 'Email not found'}), 404

# #     # Generate and store a new OTP
# #     otp = ''.join([str(random.randint(0, 9)) for _ in range(6)])  # 6-digit OTP
# #     session['otp'] = otp

# #     # Send OTP email
# #     send_otp(email)

# #     return jsonify({'message': 'OTP resent successfully'}), 200


# @user.route('/resend_otp', methods=["POST"])
# def resend_otp():
#     email = request.get_json().get("email")
#     if not email:
#         return jsonify({'error': 'Email is required'}), 400

#     # Validate if email is in session data
#     if session.get('registration_data') and session['registration_data'].get('email') == email:
#         # Generate new OTP
#         otp = ''.join([str(random.randint(0, 9)) for _ in range(6)])  # 6-digit OTP
#         session['otp'] = otp

#         # Send the new OTP to the email
#         msg = EmailMessage()
#         msg['Subject'] = 'OTP Verification'
#         msg['From'] = EMAIL_USER
#         msg['To'] = email
#         msg.set_content(f'Your new OTP is: {otp}')

#         try:
#             with smtplib.SMTP('smtp.gmail.com', 587) as server:
#                 server.starttls()
#                 server.login(EMAIL_USER, EMAIL_PASS)
#                 server.send_message(msg)
#                 print("OTP resent successfully.")
#                 return jsonify({'message': 'OTP resent successfully'}), 200
#         except smtplib.SMTPAuthenticationError:
#             return jsonify({'error': 'Failed to authenticate with the SMTP server. Check your credentials.'}), 500
#         except smtplib.SMTPConnectError:
#             return jsonify({'error': 'Failed to connect to the SMTP server. Check your network connection and server address.'}), 500
#         except smtplib.SMTPException as e:
#             return jsonify({'error': f'Failed to resend OTP email: {str(e)}'}), 500
#     else:
#         return jsonify({'error': 'Email not found or OTP session expired'}), 400


# @user.route('/users', methods=["GET"])
# @jwt_required()
# def get_all_users():
#     current_user_id = get_jwt_identity()
#     current_user = User.query.get_or_404(current_user_id)

#     if not current_user.is_admin:
#         return jsonify({'error': 'Only admin users can access this resource'}), 403

#     try:
#         users = User.query.all()
#         serialized_users = [
#             {
#                 'id': user.id,
#                 'fullname': user.fullname,
#                 'email': user.email,
#                 'church': user.church,
#                 # 'role': user.role,
#                 # 'image': user.image,
#                 'date_of_birth': user.date_of_birth,
#                 'contact': user.contact
#             }
#             for user in users
#         ]
#         return jsonify({'users': serialized_users}), 200

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# @user.route('/user/<int:user_id>', methods=["GET"])
# @jwt_required()
# def get_user_by_id(user_id):
#     current_user_id = get_jwt_identity()
#     current_user = User.query.get_or_404(current_user_id)

#     if not current_user.is_admin:
#         return jsonify({'error': 'Only admin users can access this resource by ID'}), 403

#     try:
#         user = User.query.get_or_404(user_id)
#         serialized_user = {
#             'id': user.id,
#             'fullname': user.fullname,
#             'email': user.email,
#             'church': user.church,
#             'role': user.role,
#             'image': user.image,
#             'date_of_birth': user.date_of_birth,
#             'contact': user.contact
#         }
#         return jsonify({'user': serialized_user}), 200

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# @user.route('/user/<username>', methods=["GET"])
# @jwt_required()
# def get_user_by_username(username):
#     try:
#         user = User.query.filter_by(fullname=username).first_or_404()
#         serialized_user = {
#             'id': user.id,
#             'fullname': user.fullname,
#             'email': user.email,
#             'church': user.church,
#             # 'role': user.role,
#             # 'image': user.image,
#             'date_of_birth': user.date_of_birth,
#             'contact': user.contact
#         }
#         return jsonify({'user': serialized_user}), 200

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
    
    
# @user.route('/login', methods=['POST'])

# def login():
#     data = request.json
#     email = data.get("email")
#     password = data.get("password")

#     if not email or not password:
#         return jsonify({"error": "Email and password are required"}), 400

#     if email == DEFAULT_ADMIN_EMAIL and password == DEFAULT_ADMIN_PASSWORD:
#         access_token = create_access_token(identity='admin')
#         return jsonify({
#             'access_token': access_token,
#             'user': {
#                 'id': 'admin',
#                 'email': DEFAULT_ADMIN_EMAIL,
#                 'username': 'Admin',
#                 'is_admin': True
#             }
#         }), 200

#     user = User.query.filter_by(email=email).first()
    
#     if user:
#         print(f"User found: {user}")
#         print(f"Stored password hash: {user.password}")
#         print(f"Entered password: {password}")
#         password_matches = bcrypt.check_password_hash(user.password, password)
#         print(f"Password matches: {password_matches}")

#     if user and bcrypt.check_password_hash(user.password, password):
#         access_token = create_access_token(identity=user.id)
#         return jsonify({
#             'access_token': access_token,
#             'user': {
#                 'id': user.id,
#                 'email': user.email,
#                 'username': user.fullname,
#                 'is_admin': user.is_admin
#             }
#         }), 200

#     return jsonify({'error': 'Invalid email or password'}), 401

# @user.route('/logout', methods=['POST'])
# @jwt_required()
# def logout():
#     return jsonify({'message': 'User logged out successfully'}), 200

# @user.route('/update_user/<int:user_id>', methods=["PUT"])
# @jwt_required()
# def update_user(user_id):
#     data = request.json
#     current_user_id = get_jwt_identity()
#     current_user = User.query.get_or_404(current_user_id)

#     if not current_user.is_admin:
#         return jsonify({'error': 'Only admin users can update this resource'}), 403

#     user = User.query.get_or_404(user_id)
#     user.fullname = data.get('fullname', user.fullname)
#     user.email = data.get('email', user.email)
#     user.church = data.get('church', user.church)
#     # user.role = data.get('role', user.role)
#     # user.image = data.get('image', user.image)
#     user.date_of_birth = datetime.strptime(data.get('date_of_birth'), '%Y-%m-%d').date() if data.get('date_of_birth') else user.date_of_birth
#     user.contact = data.get('contact', user.contact)
    
#     db.session.commit()

#     return jsonify({'message': 'User updated successfully'}), 200

# @user.route('/delete_user/<int:user_id>', methods=["DELETE"])
# @jwt_required()
# def delete_user(user_id):
#     current_user_id = get_jwt_identity()
#     current_user = User.query.get_or_404(current_user_id)

#     if not current_user.is_admin:
#         return jsonify({'error': 'Only admin users can delete this resource'}), 403

#     user = User.query.get_or_404(user_id)
#     db.session.delete(user)
#     db.session.commit()

#     return jsonify({'message': 'User deleted successfully'}), 200

# def generate_token(user_id):
#     try:
#         # Set the expiration time for the token (e.g., 1 day)
#         expiration_time = datetime.utcnow() + timedelta(days=1)
        
#         # payload is a JSON object that contains assertions about the user or any entity
#         # In this case the payload is containing user_id and expiration time
#         payload = {
#             'user_id': user_id,
#             'exp': expiration_time
#         }

#         # Encode the payload and create the token jwt(JSON Web Tokens)
#         # algorithm is the method used for signing and verifying the token
#         token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

#         return token

#     except Exception as e:
#         # Handle token generation error
#         print(f"Token generation failed: {str(e)}")




# # from flask import jsonify, request, session, Blueprint
# # from datetime import datetime, timedelta
# # import os, re, random, smtplib
# # from email.message import EmailMessage
# # from FIMAPP.models.user import User
# # from FIMAPP.extensions import bcrypt, jwt, db
# # from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
# # from dotenv import load_dotenv
# # from werkzeug.security import generate_password_hash, check_password_hash

# # # Load environment variables
# # load_dotenv()

# # # Environment variables for email
# # EMAIL_USER = os.getenv('EMAIL_USER')
# # EMAIL_PASS = os.getenv('EMAIL_PASS')

# # # Blueprint setup
# # user = Blueprint('user', __name__, url_prefix='/api/v1/user')

# # # Secret key for encoding and decoding the token
# # SECRET_KEY = 'A0703b91L08e9K9JV'

# # DEFAULT_ADMIN_EMAIL = 'freeindeedministriesrivers@gmail.com'
# # DEFAULT_ADMIN_PASSWORD = 'FIMadmin@5464.org'

# # # Utility function to validate email format
# # def validate_email_format(email):
# #     email_pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
# #     return re.match(email_pattern, email)

# # def validate_password(password):
# #     if len(password) < 8:
# #         return "Password must have at least 8 characters."
# #     if not re.search(r"[A-Z]", password):
# #         return "Password must have at least one uppercase letter."
# #     if not re.search(r"[0-9]", password):
# #         return "Password must have at least one number."
# #     if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
# #         return "Password must have at least one special character."
# #     return None

# # def send_otp(email):
# #     otp = ''.join([str(random.randint(0, 9)) for _ in range(6)])  # 6-digit OTP
# #     session['otp'] = otp

# #     msg = EmailMessage()
# #     msg['Subject'] = 'OTP Verification'
# #     msg['From'] = EMAIL_USER
# #     msg['To'] = email
# #     msg.set_content(f'Your OTP is: {otp}')

# #     try:
# #         with smtplib.SMTP('smtp.gmail.com', 587) as server:
# #             server.starttls()
# #             server.login(EMAIL_USER, EMAIL_PASS)
# #             server.send_message(msg)
# #             print("OTP sent successfully.")
# #     except smtplib.SMTPAuthenticationError:
# #         print("Failed to authenticate with the SMTP server. Check your credentials.")
# #     except smtplib.SMTPConnectError:
# #         print("Failed to connect to the SMTP server. Check your network connection and server address.")
# #     except smtplib.SMTPException as e:
# #         print(f"Failed to send OTP email: {str(e)}")

# # @user.route('/register', methods=["POST"])
# # def register():
# #     data = request.get_json()
# #     required_fields = ["fullname", "email", "date_of_birth", "password", "contact", "church", "role", "image", "is_admin"]

# #     # Check for missing fields
# #     missing_fields = [field for field in required_fields if field not in data]
# #     if missing_fields:
# #         return jsonify({'error': f"Missing fields: {', '.join(missing_fields)}"}), 400
# #     if data is None:
# #         return jsonify({"error": "No data provided"}), 400

# #     # Validate email format
# #     if not validate_email_format(data["email"]):
# #         return jsonify({'error': "Invalid email format"}), 400

# #     # Check for existing email
# #     if User.query.filter_by(email=data["email"]).first():
# #         return jsonify({'error': "The email already exists"}), 400

# #     # Validate password strength
# #     password_validation_error = validate_password(data["password"])
# #     if password_validation_error:
# #         return jsonify({'error': password_validation_error}), 400

# #     # Store registration data in session and send OTP
# #     session['registration_data'] = data
# #     send_otp(data["email"])

# #     return jsonify({'message': 'OTP sent to your email. Please verify to complete registration.'}), 200

# # @user.route('/verify_otp', methods=["POST"])
# # def verify_otp():
# #     input_otp = request.get_json().get("otp")
# #     stored_otp = session.get('otp')
# #     data = session.get('registration_data')

# #     # Validate OTP
# #     if input_otp != stored_otp:
# #         return jsonify({'error': 'Invalid OTP'}), 400

# #     try:
# #         # Hash password using bcrypt
# #         hashed_password = bcrypt.generate_password_hash(data["password"]).decode('utf-8')

# #         # Convert is_admin to boolean
# #         is_admin = data.get("is_admin", "false").lower() == "true"

# #         # Create new user
# #         new_user = User(
# #             fullname=data["fullname"],
# #             email=data["email"],
# #             church=data["church"],
# #             role=data["role"],
# #             contact=data["contact"],
# #             date_of_birth=datetime.strptime(data["date_of_birth"], '%Y-%m-%d').date() if data["date_of_birth"] else None,
# #             image=data["image"],
# #             is_admin=is_admin,
# #             password=hashed_password
# #         )

# #         # Add and commit new user to the database
# #         db.session.add(new_user)
# #         db.session.commit()

# #         # Clear session data
# #         session.pop('otp', None)
# #         session.pop('registration_data', None)

# #         return jsonify({'message': 'User created successfully'}), 201

# #     except Exception as e:
# #         db.session.rollback()
# #         return jsonify({'error': str(e)}), 500

# # @user.route('/users', methods=["GET"])
# # @jwt_required()
# # def get_all_users():
# #     current_user_id = get_jwt_identity()
# #     current_user = User.query.get_or_404(current_user_id)

# #     if not current_user.is_admin:
# #         return jsonify({'error': 'Only admin users can access this resource'}), 403

# #     try:
# #         users = User.query.all()
# #         serialized_users = [
# #             {
# #                 'id': user.id,
# #                 'fullname': user.fullname,
# #                 'email': user.email,
# #                 'church': user.church,
# #                 'role': user.role,
# #                 'image': user.image,
# #                 'date_of_birth': user.date_of_birth,
# #                 'contact': user.contact
# #             }
# #             for user in users
# #         ]
# #         return jsonify({'users': serialized_users}), 200

# #     except Exception as e:
# #         return jsonify({'error': str(e)}), 500

# # @user.route('/user/<int:user_id>', methods=["GET"])
# # @jwt_required()
# # def get_user_by_id(user_id):
# #     current_user_id = get_jwt_identity()
# #     current_user = User.query.get_or_404(current_user_id)

# #     if not current_user.is_admin:
# #         return jsonify({'error': 'Only admin users can access this resource by ID'}), 403

# #     try:
# #         user = User.query.get_or_404(user_id)
# #         serialized_user = {
# #             'id': user.id,
# #             'fullname': user.fullname,
# #             'email': user.email,
# #             'church': user.church,
# #             'role': user.role,
# #             'image': user.image,
# #             'date_of_birth': user.date_of_birth,
# #             'contact': user.contact
# #         }
# #         return jsonify({'user': serialized_user}), 200

# #     except Exception as e:
# #         return jsonify({'error': str(e)}), 500

# # @user.route('/user/<username>', methods=["GET"])
# # @jwt_required()
# # def get_user_by_username(username):
# #     try:
# #         user = User.query.filter_by(fullname=username).first_or_404()
# #         serialized_user = {
           
# #             'id': user.id,
# #             'fullname': user.fullname,
# #             'email': user.email,
# #             'church': user.church,
# #             'role': user.role,
# #             'image': user.image,
# #             'date_of_birth': user.date_of_birth,
# #             'contact': user.contact
# #         }
# #         return jsonify({'user': serialized_user}), 200

# #     except Exception as e:
# #         return jsonify({'error': str(e)}), 500

# # @user.route('/login', methods=['POST'])
# # def login():
# #     data = request.json
# #     email = data.get("email")
# #     password = data.get("password")

# #     if not email or not password:
# #         return jsonify({"error": "Email and password are required"}), 400

# #     if email == DEFAULT_ADMIN_EMAIL and password == DEFAULT_ADMIN_PASSWORD:
# #         access_token = create_access_token(identity='admin')
# #         return jsonify({
# #             'access_token': access_token,
# #             'user': {
# #                 'id': 'admin',
# #                 'email': DEFAULT_ADMIN_EMAIL,
# #                 'username': 'Admin',
# #                 'is_admin': True
# #             }
# #         }), 200

# #     user = User.query.filter_by(email=email).first()
    
# #     if user:
# #         print(f"User found: {user}")
# #         print(f"Stored password hash: {user.password}")
# #         print(f"Entered password: {password}")
# #         password_matches = bcrypt.check_password_hash(user.password, password)
# #         print(f"Password matches: {password_matches}")

# #     if user and bcrypt.check_password_hash(user.password, password):
# #         access_token = create_access_token(identity=user.id)
# #         return jsonify({
# #             'access_token': access_token,
# #             'user': {
# #                 'id': user.id,
# #                 'email': user.email,
# #                 'username': user.fullname,
# #                 'is_admin': user.is_admin
# #             }
# #         }), 200

# #     return jsonify({'error': 'Invalid email or password'}), 401

# # @user.route('/logout', methods=['POST'])
# # @jwt_required()
# # def logout():
# #     return jsonify({'message': 'User logged out successfully'}), 200

# # @user.route('/update_user/<int:user_id>', methods=["PUT"])
# # @jwt_required()
# # def update_user(user_id):
# #     data = request.json
# #     current_user_id = get_jwt_identity()
# #     current_user = User.query.get_or_404(current_user_id)

# #     if not current_user.is_admin:
# #         return jsonify({'error': 'Only admin users can update this resource'}), 403

# #     user = User.query.get_or_404(user_id)
# #     user.fullname = data.get('fullname', user.fullname)
# #     user.email = data.get('email', user.email)
# #     user.church = data.get('church', user.church)
# #     user.role = data.get('role', user.role)
# #     user.image = data.get('image', user.image)
# #     user.date_of_birth = datetime.strptime(data.get('date_of_birth'), '%Y-%m-%d').date() if data.get('date_of_birth') else user.date_of_birth
# #     user.contact = data.get('contact', user.contact)
    
# #     db.session.commit()

# #     return jsonify({'message': 'User updated successfully'}), 200

# # @user.route('/delete_user/<int:user_id>', methods=["DELETE"])
# # @jwt_required()
# # def delete_user(user_id):
# #     current_user_id = get_jwt_identity()
# #     current_user = User.query.get_or_404(current_user_id)

# #     if not current_user.is_admin:
# #         return jsonify({'error': 'Only admin users can delete this resource'}), 403

# #     user = User.query.get_or_404(user_id)
# #     db.session.delete(user)
# #     db.session.commit()

# #     return jsonify({'message': 'User deleted successfully'}), 200

# # def generate_token(user_id):
# #     try:
# #         # Set the expiration time for the token (e.g., 1 day)
# #         expiration_time = datetime.utcnow() + timedelta(days=1)
        
# #         # payload is a JSON object that contains assertions about the user or any entity
# #         # In this case the payload is containing user_id and expiration time
# #         payload = {
# #             'user_id': user_id,
# #             'exp': expiration_time
# #         }

# #         # Encode the payload and create the token jwt(JSON Web Tokens)
# #         # algorithm is the method used for signing and verifying the token
# #         token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

# #         return token

# #     except Exception as e:
# #         # Handle token generation error
# #         print(f"Token generation failed: {str(e)}")
# #         return None








# # import os
# # import re
# # import random
# # import smtplib
# # from email.message import EmailMessage
# # from datetime import datetime
# # from flask import Blueprint, request, jsonify, session
# # from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
# # from FIMAPP.models.user import User
# # from FIMAPP.extensions import bcrypt, jwt, db
# # from dotenv import load_dotenv
# # import logging

# # # Load environment variables
# # load_dotenv()

# # # Setup logging
# # logging.basicConfig(level=logging.INFO)
# # logger = logging.getLogger(__name__)

# # # Environment variables for email
# # EMAIL_USER = os.getenv('EMAIL_USER')
# # EMAIL_PASS = os.getenv('EMAIL_PASS')

# # # Blueprint setup
# # user = Blueprint('user', __name__, url_prefix='/api/v1/user')

# # # Utility function to validate email format
# # def validate_email_format(email):
# #     email_pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
# #     return re.match(email_pattern, email)

# # # Utility function to validate password strength
# # def validate_password(password):
# #     if len(password) < 8:
# #         return "Password must have at least 8 characters."
# #     if not re.search(r"[A-Z]", password):
# #         return "Password must have at least one uppercase letter."
# #     if not re.search(r"[0-9]", password):
# #         return "Password must have at least one number."
# #     if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
# #         return "Password must have at least one special character."
# #     return None

# # # Utility function to send OTP email
# # def send_otp(email):
# #     otp = ''.join([str(random.randint(0, 9)) for _ in range(6)])  # 6-digit OTP
# #     session['otp'] = otp

# #     msg = EmailMessage()
# #     msg['Subject'] = 'OTP Verification'
# #     msg['From'] = EMAIL_USER
# #     msg['To'] = email
# #     msg.set_content(f'Your OTP is: {otp}')

# #     try:
# #         with smtplib.SMTP('smtp.gmail.com', 587) as server:
# #             server.starttls()
# #             server.login(EMAIL_USER, EMAIL_PASS)
# #             server.send_message(msg)
# #             logger.info("OTP sent successfully.")
# #     except smtplib.SMTPException as e:
# #         logger.error(f"Failed to send OTP email: {str(e)}")

# # @user.route('/register', methods=["POST"])
# # def register():
# #     data = request.form
# #     required_fields = ["fullname", "email", "date_of_birth", "password", "contact", "church", "role", "image", "is_admin"]

# #     # Check for missing fields
# #     if not all(field in data for field in required_fields):
# #         return jsonify({'error': "All fields are required"}), 400

# #     # Validate email format
# #     if not validate_email_format(data["email"]):
# #         return jsonify({'error': "Invalid email format"}), 400

# #     # Check for existing email
# #     if User.query.filter_by(email=data["email"]).first():
# #         return jsonify({'error': "The email already exists"}), 400

# #     # Validate password strength
# #     password_validation_error = validate_password(data["password"])
# #     if password_validation_error:
# #         return jsonify({'error': password_validation_error}), 400

# #     # Store registration data in session and send OTP
# #     session['registration_data'] = data.to_dict()
# #     send_otp(data["email"])

# #     return jsonify({'message': 'OTP sent to your email. Please verify to complete registration.'}), 200

# # @user.route('/verify_otp', methods=["POST"])
# # def verify_otp():
# #     input_otp = request.json.get("otp")
# #     stored_otp = session.get('otp')
# #     data = session.get('registration_data')

# #     # Validate OTP
# #     if input_otp != stored_otp:
# #         return jsonify({'error': 'Invalid OTP'}), 400

# #     try:
# #         # Hash password
# #         hashed_password = bcrypt.generate_password_hash(data["password"]).decode('utf-8')
# #         is_admin = data.get("is_admin", False)

# #         # Create new user
# #         new_user = User(
# #             fullname=data["fullname"],
# #             email=data["email"],
# #             church=data["church"],
# #             role=data["role"],
# #             contact=data["contact"],
# #             date_of_birth=datetime.strptime(data["date_of_birth"], '%Y-%m-%d').date() if data["date_of_birth"] else None,
# #             image=data["image"],
# #             is_admin=is_admin,
# #             password=hashed_password
# #         )

# #         # Add and commit new user to the database
# #         db.session.add(new_user)
# #         db.session.commit()

# #         # Clear session data
# #         session.pop('otp', None)
# #         session.pop('registration_data', None)

# #         return jsonify({'message': 'User created successfully'}), 201

# #     except Exception as e:
# #         db.session.rollback()
# #         logger.error(f"Error creating user: {str(e)}")
# #         return jsonify({'error': str(e)}), 500

# # @user.route('/users', methods=["GET"])
# # @jwt_required()
# # def get_all_users():
# #     current_user_id = get_jwt_identity()
# #     current_user = User.query.get_or_404(current_user_id)

# #     if not current_user.is_admin:
# #         return jsonify({'error': 'Only admin users can access this resource'}), 403

# #     try:
# #         users = User.query.all()
# #         serialized_users = [
# #             {
# #                 'id': user.id,
# #                 'fullname': user.fullname,
# #                 'email': user.email,
# #                 'church': user.church,
# #                 'role': user.role,
# #                 'image': user.image,
# #                 'date_of_birth': user.date_of_birth,
# #                 'contact': user.contact
# #             }
# #             for user in users
# #         ]
# #         return jsonify({'users': serialized_users}), 200

# #     except Exception as e:
# #         logger.error(f"Error fetching users: {str(e)}")
# #         return jsonify({'error': str(e)}), 500

# # @user.route('/user/<int:user_id>', methods=["GET"])
# # @jwt_required()
# # def get_user_by_id(user_id):
# #     current_user_id = get_jwt_identity()
# #     current_user = User.query.get_or_404(current_user_id)

# #     if not current_user.is_admin:
# #         return jsonify({'error': 'Only admin users can access this resource by ID'}), 403

# #     try:
# #         user = User.query.get_or_404(user_id)
# #         serialized_user = {
# #             'id': user.id,
# #             'fullname': user.fullname,
# #             'email': user.email,
# #             'church': user.church,
# #             'role': user.role,
# #             'image': user.image,
# #             'date_of_birth': user.date_of_birth,
# #             'contact': user.contact
# #         }
# #         return jsonify({'user': serialized_user}), 200

# #     except Exception as e:
# #         logger.error(f"Error fetching user by ID: {str(e)}")
# #         return jsonify({'error': str(e)}), 500

# # @user.route('/user/<username>', methods=["GET"])
# # @jwt_required()
# # def get_user_by_username(username):
# #     try:
# #         user = User.query.filter_by(fullname=username).first_or_404()
# #         serialized_user = {
# #             'id': user.id,
# #             'fullname': user.fullname,
# #             'email': user.email,
# #             'church': user.church,
# #             'role': user.role,
# #             'image': user.image,
# #             'date_of_birth': user.date_of_birth,
# #             'contact': user.contact
# #         }
# #         return jsonify({'user': serialized_user}), 200

# #     except Exception as e:
# #         logger.error(f"Error fetching user by username: {str(e)}")
# #         return jsonify({'error': str(e)}), 500
    
# # DEFAULT_ADMIN_EMAIL = 'freeindeedministriesrivers@gmail.com'
# # DEFAULT_ADMIN_PASSWORD = 'FIMadmin@5464.org'

# # @user.route('/login', methods=['POST'])
# # def login():
# #     data = request.json
# #     email = data.get("email")
# #     password = data.get("password")

# #     if email == DEFAULT_ADMIN_EMAIL and password == DEFAULT_ADMIN_PASSWORD:
# #         access_token = create_access_token(identity='admin')
# #         return jsonify({
# #             'access_token': access_token,
# #             'user': {
# #                 'id': 'admin',
# #                 'email': DEFAULT_ADMIN_EMAIL,
# #                 'username': 'Admin',
# #                 'is_admin': True
# #             }
# #         }), 200

# #     user = User.query.filter_by(email=email).first()
    
# #     if user and bcrypt.check_password_hash(user.password, password):
# #         access_token = create_access_token(identity=user.id)
# #         return jsonify({
# #             'access_token': access_token,
# #             'user': {
# #                 'id': user.id,
# #                 'email': user.email,
# #                 'username': user.fullname,
# #                 'is_admin': user.is_admin
# #             }
# #         }), 200

# #     return jsonify({'error': 'Invalid email or password'}), 401

# # @user.route('/logout', methods=['POST'])
# # @jwt_required()
# # def logout():
# #     return jsonify({'message': 'User logged out successfully'}), 200

# # @user.route('/update_user/<int:user_id>', methods=["PUT"])
# # @jwt_required()
# # def update_user(user_id):
# #     data = request.json
# #     current_user_id = get_jwt_identity()
# #     current_user = User.query.get_or_404(current_user_id)

# #     if not current_user.is_admin:
# #         return jsonify({'error': 'Only admin users can update users'}), 403

# #     try:
# #         user = User.query.get_or_404(user_id)

# #         user.fullname = data.get('fullname', user.fullname)
# #         user.email = data.get('email', user.email)
# #         user.church = data.get('church', user.church)
# #         user.role = data.get('role', user.role)
# #         user.image = data.get('image', user.image)
# #         user.date_of_birth = datetime.strptime(data.get('date_of_birth', user.date_of_birth.strftime('%Y-%m-%d')), '%Y-%m-%d')
# #         user.contact = data.get('contact', user.contact)

# #         db.session.commit()
# #         return jsonify({'message': 'User updated successfully'}), 200

# #     except Exception as e:
# #         db.session.rollback()
# #         logger.error(f"Error updating user: {str(e)}")
# #         return jsonify({'error': str(e)}), 500

# # @user.route('/delete_user/<int:user_id>', methods=["DELETE"])
# # @jwt_required()
# # def delete_user(user_id):
# #     current_user_id = get_jwt_identity()
# #     current_user = User.query.get_or_404(current_user_id)

# #     if not current_user.is_admin:
# #         return jsonify({'error': 'Only admin users can delete users'}), 403

# #     try:
# #         user = User.query.get_or_404(user_id)
# #         db.session.delete(user)
# #         db.session.commit()
# #         return jsonify({'message': 'User deleted successfully'}), 200

# #     except Exception as e:
# #         db.session.rollback()
# #         logger.error(f"Error deleting user: {str(e)}")
# #         return jsonify({'error': str(e)}), 500





# from flask import Blueprint, request, jsonify, session
# from FIMAPP.models.user import User
# from FIMAPP.extensions import bcrypt, jwt, db
# from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
# from datetime import datetime, timedelta
# import random
# import smtplib
# import validators
# from werkzeug.security import generate_password_hash, check_password_hash
# from email.message import EmailMessage
# import re
# import hashlib
# import os
# from dotenv import load_dotenv
# import base64
# import email
# from flask import Blueprint, request, jsonify
# from FIMAPP.models.user import User
# from FIMAPP.extensions import db, bcrypt, jwt
# from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
# from werkzeug.security import generate_password_hash, check_password_hash
# from datetime import datetime

# # user = Blueprint('user', __name__, url_prefix='/api/v1/user')



    

# # DEFAULT_ADMIN_EMAIL = 'freeindeedministriesrivers@gmail.com'
# # DEFAULT_ADMIN_PASSWORD = 'FIMadmin@5464.org'


# # @user.route('/register', methods=["POST"])
# # def register():
# #     data = request.json
# #     required_fields = ["fullname", "email", "image", "date_of_birth", "password", "contact", "is_admin", "church", "role"]

# #     if not all(field in data for field in required_fields):
# #         return jsonify({'error': "All required fields must be provided"}), 400
    
# #     email_pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
# #     return re.match(email_pattern, email)
# #     if User.query.filter_by(email=data["email"]).first():
# #         return jsonify({'error': "Email already exists"}), 400
    
# #     if len(password) < 8:
# #         return "Password must have at least 8 characters."
# #     if not re.search(r"[A-Z]", password):
# #         return "Password must have at least one uppercase letter."
# #     if not re.search(r"[0-9]", password):
# #         return "Password must have at least one number."
# #     if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
# #         return "Password must have at least one special character."
# #     return None


# #     hashed_password = bcrypt.generate_password_hash(data["password"]).decode('utf-8')

# #     try:
# #         is_admin = data.get("is_admin", False)
# #         if isinstance(is_admin, str):
# #             is_admin = is_admin.lower() in ['true', '1', 't', 'yes']
# #         elif not isinstance(is_admin, bool):
# #             is_admin = bool(is_admin)

# #         new_user = User(
# #             fullname=data["fullname"],
# #             email=data["email"],
# #             password=hashed_password,
# #             contact=data["contact"],
# #             date_of_birth=datetime.strptime(data.get("date_of_birth", '1970-01-01'), '%Y-%m-%d').date() if data.get("date_of_birth") else None,
# #             image=data.get("image"),
# #             church=data.get("church"),
# #             role=data.get("role", 'member'),
# #             is_admin=is_admin
# #         )

# #         db.session.add(new_user)
# #         db.session.commit()
# #         return jsonify({'message': 'User registered successfully'}), 201

# #     except Exception as e:
# #         db.session.rollback()
# #         return jsonify({'error': str(e)}), 500

# # @user.route('/login', methods=['POST'])
# # def login():
# #     data = request.json
# #     email = data.get("email")
# #     password = data.get("password")

# #     if email == DEFAULT_ADMIN_EMAIL and password == DEFAULT_ADMIN_PASSWORD:
# #         access_token = create_access_token(identity='admin')
# #         return jsonify({
# #             'access_token': access_token,
# #             'user': {
# #                 'id': 'admin',
# #                 'email': DEFAULT_ADMIN_EMAIL,
# #                 'username': 'Admin',
# #                 'is_admin': True
# #             }
# #         }), 200

# #     user = User.query.filter_by(email=email).first()
    
# #     if user and bcrypt.check_password_hash(user.password, password):
# #         access_token = create_access_token(identity=user.id)
# #         return jsonify({
# #             'access_token': access_token,
# #             'user': {
# #                 'id': user.id,
# #                 'email': user.email,
# #                 'username': user.fullname,
# #                 'is_admin': user.is_admin
# #             }
# #         }), 200

# #     return jsonify({'error': 'Invalid email or password'}), 401

# # @user.route('/logout', methods=['POST'])
# # @jwt_required()
# # def logout():
# #     user_id = get_jwt_identity()
# #     try:
# #         # No state management for logout as JWT tokens are stateless
# #         return jsonify({'message': 'Logout successful'}), 200
# #     except Exception as e:
# #         return jsonify({'error': str(e)}), 500

# # @user.route('/<int:user_id>', methods=["GET"])
# # @jwt_required()
# # def get_user(user_id):
# #     current_user_id = get_jwt_identity()
# #     if not is_admin(current_user_id):
# #         return jsonify({'error': 'Access forbidden: Only admins can view user details'}), 403

# #     user = User.query.get_or_404(user_id)
# #     return jsonify({
# #         'id': user.id,
# #         'fullname': user.fullname,
# #         'email': user.email,
# #         'contact': user.contact,
# #         'church': user.church,
# #         'role': user.role,
# #         'date_of_birth': user.date_of_birth.strftime('%Y-%m-%d') if user.date_of_birth else None,
# #         'image': user.image,
# #         'is_admin': user.is_admin
# #     }), 200

# # def is_default_admin(user_id):
# #     user = User.query.get(user_id)
# #     return user and user.email == DEFAULT_ADMIN_EMAIL and bcrypt.check_password_hash(user.password, DEFAULT_ADMIN_PASSWORD)

# # @user.route('/all', methods=["GET"])
# # @jwt_required()
# # def get_all_users():
# #     current_user_id = get_jwt_identity()

# #     if not is_default_admin(current_user_id):
# #         return jsonify({'error': 'Access forbidden: Only the default admin can view all users'}), 403

# #     users = User.query.all()
# #     serialized_users = [{
# #         'id': user.id,
# #         'fullname': user.fullname,
# #         'email': user.email,
# #         'contact': user.contact,
# #         'church': user.church,
# #         'role': user.role,
# #         'date_of_birth': user.date_of_birth.strftime('%Y-%m-%d') if user.date_of_birth else None,
# #         'image': user.image,
# #         'is_admin': user.is_admin
# #     } for user in users]
    
# #     return jsonify({'users': serialized_users}), 200


# # @user.route('/<int:user_id>', methods=["PUT"])
# # @jwt_required()
# # def update_user(user_id):
# #     current_user_id = get_jwt_identity()
# #     if current_user_id != user_id and not is_admin(current_user_id):
# #         return jsonify({'error': 'Access forbidden: You can only update your own details'}), 403

# #     data = request.json
# #     user = User.query.get_or_404(user_id)

# #     if 'password' in data:
# #         password_error = validate_password(data['password'])
# #         if password_error:
# #             return jsonify({'error': password_error}), 400
# #         data['password'] = bcrypt.generate_password_hash(data['password']).decode('utf-8')

# #     for key, value in data.items():
# #         if hasattr(user, key):
# #             setattr(user, key, value)

# #     try:
# #         db.session.commit()
# #         return jsonify({'message': 'User updated successfully'}), 200
# #     except Exception as e:
# #         db.session.rollback()
# #         return jsonify({'error': str(e)}), 500

# # @user.route('/<int:user_id>', methods=["DELETE"])
# # @jwt_required()
# # def delete_user(user_id):
# #     current_user_id = get_jwt_identity()
# #     if not is_admin(current_user_id):
# #         return jsonify({'error': 'Access forbidden: Only admins can delete users'}), 403

# #     user = User.query.get_or_404(user_id)
# #     try:
# #         db.session.delete(user)
# #         db.session.commit()
# #         return jsonify({'message': 'User deleted successfully'}), 200
# #     except Exception as e:
# #         db.session.rollback()
# #         return jsonify({'error': str(e)}), 500

from flask import Blueprint, request, jsonify
from FIMAPP.models.user import User
from FIMAPP.extensions import db, bcrypt, jwt
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from email_validator import validate_email
from datetime import datetime
from werkzeug.security import check_password_hash
from functools import wraps

user = Blueprint('user', __name__, url_prefix='/api/v1/user')

# Default admin credentials
ADMIN_EMAIL = 'freeindeedministriesrivers@gmail.com'
ADMIN_PASSWORD = 'FIMadmin@5464.org'

# Admin required decorator
def admin_required(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        current_user = get_jwt_identity()

        # Ensure `current_user` is parsed correctly
        if isinstance(current_user, str):
            try:
                import json
                current_user = json.loads(current_user)  # Decode JSON string if needed
            except (ValueError, TypeError):
                pass  # Leave as-is if it's not JSON

        # Check admin status
        if not isinstance(current_user, dict) or current_user.get('is_admin') != True:
            return jsonify({'error': 'Admin access required'}), 403
        
        return fn(*args, **kwargs)
    return wrapper

# Register a new user
@user.route('/register', methods=['POST'])
def register_user():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        fullname = data.get('fullname')

        if not email or not password or not fullname:
            return jsonify({'error': 'Missing required fields'}), 400

        # Validate email
        try:
            validate_email(email)
        except EmailNotValidError:
            return jsonify({'error': 'Invalid email format'}), 400

        # Validate password length
        if len(password) < 7:
            return jsonify({'error': 'Password must be at least 7 characters long'}), 400

        # Check if email already exists
        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'Email already exists'}), 409

        # Create hashed password
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # Create new user
        new_user = User(
            fullname=fullname,
            email=email,
            password=hashed_password,
            is_admin=False,
            date_of_birth=datetime.strptime(data.get('date_of_birth'), '%Y-%m-%d') if data.get('date_of_birth') else None,
            contact_number=data.get('contact_number'),
            church=data.get('church'),
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User registered successfully', 'user': {
            'id': new_user.id,
            'fullname': new_user.fullname,
            'email': new_user.email,
            'is_admin': new_user.is_admin,
            'church': new_user.church,
        }}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# Login a user or admin
@user.route('/login', methods=["POST"])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    # Check if it's the default admin logging in
    if email == ADMIN_EMAIL and password == ADMIN_PASSWORD:
        # Directly log in the admin
        access_token = create_access_token(identity='admin')  # Access token for admin
        return jsonify({
            'access_token': access_token,
            'user': {
                'id': 'admin',
                'email': ADMIN_EMAIL,
                'username': 'Admin',
                'is_admin': True,
            }
        }), 200

    # Check if the email belongs to a registered user
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'Invalid email or password'}), 400

    # Verify the password
    if not bcrypt.check_password_hash(user.password, password):  # Using bcrypt
        return jsonify({'error': 'Invalid email or password'}), 400

    # Create access token for regular user
    access_token = create_access_token(identity=user.id)

    return jsonify({
        'access_token': access_token,
        'user': {
            'id': user.id,
            'email': user.email,
            'username': user.fullname,
            'is_admin': user.is_admin,
        }
    }), 200




@user.route('/logout', methods=["POST"])
@jwt_required()
def logout():
    return jsonify({'message': 'Logout successful'}), 200


def generate_token(user_id):
    try:
        # Set the expiration time for the token (e.g., 1 day)
        expiration_time = datetime.utcnow() + timedelta(days=1)
        
        # payload is a JSON object that contains assertions about the user or any entity
        # In this case the payload is containing user_id and expiration time
        payload = {
            'user_id': user_id,
            'exp': expiration_time
        }

        # Encode the payload and create the token jwt(JSON Web Tokens)
        # algorithm is the method used for signing and verifying the token
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        return token

    except Exception as e:
        # Handle token generation error
        print(f"Token generation failed: {str(e)}")

# Get all users (admin access required)
@user.route('/get_all_users', methods=['GET'])
@admin_required
def get_all_users():
    try:
        users = User.query.all()
        output = []
        for user in users:
            output.append({
                'id': user.id,
                'fullname': user.fullname,
                'email': user.email,
                'is_admin': user.is_admin,
                'church': user.church,
                'created_at': user.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            })
        return jsonify({'users': output}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Get a specific user (admin access required)
@user.route('/get_user/<int:id>', methods=['GET'])
@admin_required
def get_user(id):
    try:
        user = User.query.get_or_404(id)
        user_data = {
            'id': user.id,
            'fullname': user.fullname,
            'email': user.email,
            'is_admin': user.is_admin,
            'church': user.church,
            'created_at': user.created_at.strftime('%Y-%m-%d %H:%M:%S'),
        }
        return jsonify(user_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Update a user (admin access required)
@user.route('/update_user/<int:id>', methods=['PUT'])
@admin_required
def update_user(id):
    try:
        user = User.query.get_or_404(id)
        data = request.get_json()

        user.fullname = data.get('fullname', user.fullname)
        user.email = data.get('email', user.email)
        if 'password' in data and data['password']:
            user.password_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        user.church = data.get('church', user.church)

        db.session.commit()

        return jsonify({'message': 'User updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# Delete a user (admin access required)
@user.route('/delete_user/<int:id>', methods=['DELETE'])
@admin_required
def delete_user(id):
    try:
        user = User.query.get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

