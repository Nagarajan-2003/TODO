#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Convert static assets (for Django Admin)
python manage.py collectstatic --no-input

# Run database migrations
python manage.py migrate