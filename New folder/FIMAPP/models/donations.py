from FIMAPP.extensions import db
from datetime import datetime


class Donation(db.Model):
    __tablename__ = 'donations'
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    bank_account = db.Column(db.String(100), nullable=True)
    telephone_contact = db.Column(db.String(20), nullable=True)
    
    def __init__(self, amount, user_id):
        super(User, self).__init__()
        self.amount = amount
        self.user_id = user_id
        self.bank_account = bank_account
        self.telephone_contact = telephone_contact
       
        
        
    def __repr__(self):
        return f"{self.amount}"
    
    
    
    

   