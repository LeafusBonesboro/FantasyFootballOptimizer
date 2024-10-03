import os

CLIENT_ID = os.getenv('YAHOO_CLIENT_ID', 'dj0yJmk9TUJvOXFNM3dhN09hJmQ9WVdrOU9VbE1WV3hxTlZFbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWJk')
CLIENT_SECRET = os.getenv('YAHOO_CLIENT_SECRET', '4a01ed97e7332ff202d8f892ac2e1add8e9eb708')
REDIRECT_URI = 'https://0e0f-2603-6080-3700-47b5-c03c-126b-e7d3-92b2.ngrok-free.app/auth/callback'
AUTHORIZATION_BASE_URL = 'https://api.login.yahoo.com/oauth2/request_auth'
TOKEN_URL = 'https://api.login.yahoo.com/oauth2/get_token'
