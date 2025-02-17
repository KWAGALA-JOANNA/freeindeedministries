from flask import Blueprint, request, jsonify
from FIMAPP.extensions import db
from FIMAPP.models import Donation
from flask_jwt_extended import jwt_required
from math import ceil

donations_bp = Blueprint('donations', __name__)

# Helper function to serialize Donation
def serialize_donation(donation):
    return {
        'id': donation.id,
        'amount': donation.amount,
        'created_at': donation.created_at.strftime('%Y-%m-%d %H:%M:%S'),
        'user_id': donation.user_id,
        'bank_account': donation.bank_account,
        'telephone_contact': donation.telephone_contact
    }

# 1. Create a donation
@donations_bp.route('/donations', methods=['POST'])
@jwt_required()
def create_donation():
    data = request.get_json()
    try:
        amount = data.get('amount')
        user_id = data.get('user_id')
        bank_account = data.get('bank_account')
        telephone_contact = data.get('telephone_contact')

        if not amount or not user_id:
            return jsonify({'error': 'Amount and user_id are required'}), 400

        donation = Donation(
            amount=amount,
            user_id=user_id,
            bank_account=bank_account,
            telephone_contact=telephone_contact
        )
        db.session.add(donation)
        db.session.commit()

        return jsonify({'message': 'Donation created successfully', 'donation': serialize_donation(donation)}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 2. Get all donations with optional filtering and pagination
@donations_bp.route('/donations', methods=['GET'])
@jwt_required()
def get_donations():
    try:
        # Filtering by user_id
        user_id = request.args.get('user_id', type=int)

        # Pagination
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)

        query = Donation.query

        # Apply user_id filter if provided
        if user_id:
            query = query.filter_by(user_id=user_id)

        # Apply pagination
        total = query.count()
        donations = query.order_by(Donation.created_at.desc()).paginate(page=page, per_page=per_page, error_out=False).items

        response = {
            'donations': [serialize_donation(donation) for donation in donations],
            'total': total,
            'page': page,
            'per_page': per_page,
            'total_pages': ceil(total / per_page)
        }

        return jsonify(response), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 3. Get a single donation by ID
@donations_bp.route('/donations/<int:donation_id>', methods=['GET'])
@jwt_required()
def get_donation(donation_id):
    try:
        donation = Donation.query.get_or_404(donation_id)
        return jsonify(serialize_donation(donation)), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 4. Update a donation
@donations_bp.route('/donations/<int:donation_id>', methods=['PUT'])
@jwt_required()
def update_donation(donation_id):
    data = request.get_json()
    try:
        donation = Donation.query.get_or_404(donation_id)

        donation.amount = data.get('amount', donation.amount)
        donation.bank_account = data.get('bank_account', donation.bank_account)
        donation.telephone_contact = data.get('telephone_contact', donation.telephone_contact)

        db.session.commit()

        return jsonify({'message': 'Donation updated successfully', 'donation': serialize_donation(donation)}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 5. Delete a donation
@donations_bp.route('/donations/<int:donation_id>', methods=['DELETE'])
@jwt_required()
def delete_donation(donation_id):
    try:
        donation = Donation.query.get_or_404(donation_id)
        db.session.delete(donation)
        db.session.commit()

        return jsonify({'message': 'Donation deleted successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
