import os
class Config:
    SQLALCHEMY_DATABASE_URI='mysql+pymysql://root:@localhost/freeindeedministries'
    # pymysql is the driver and mysql is the dialect 
    # dialect+driver://username:password@host:port/database this is the format
    # the default username is 'root' if your working with xampp
    # the server will be 'localhost' and db is the name of the database created in xampp   
    JWT_SECRET_KEY = 'HS256' 
    
    #Email configurations
    MAIL_SERVER = os.getenv('SMTP_SERVER', 'smtp.your_email_provider.com')
    MAIL_PORT = int(os.getenv('MAIL_PORT', 587))
    MAIL_USE_TLS = os.getenv('MAIL_USE_TLS', 'true').lower() in ['true', '1', 't']
    MAIL_USE_SSL = os.getenv('MAIL_USE_SSL', 'false').lower() in ['true', '1', 't']
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = os.getenv('MAIL_DEFAULT_SENDER', 'noreply@yourdomain.com')