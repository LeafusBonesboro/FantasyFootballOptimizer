from flask import Flask, render_template
import os
import secrets
from routes.auth import auth_bp
from routes.leagues import leagues_bp
from routes.teams import teams_bp
from flask_cors import CORS


os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

generated_secret_key = secrets.token_hex(24)  # Generates a random 24-byte hexadecimal string
app = Flask(__name__)
CORS(app)


# Use a persistent secret key (preferably from environment variable)
#app.secret_key = os.getenv('FLASK_SECRET_KEY', 'a_fixed_secret_key_here')
# Use a persistent secret key (preferably from environment variable)
app.secret_key = os.getenv('FLASK_SECRET_KEY', 'a_fixed_secret_key_here')

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')  # Add the /auth pre
app.register_blueprint(leagues_bp)
app.register_blueprint(teams_bp, url_prefix='/teams')  # Add a prefix for API routes

@app.route('/')
def home():
    return render_template('base.html')

if __name__ == '__main__':
    app.run
# .\ngrok http 5000
