from flask import Flask, send_from_directory, session
from flask_cors import CORS, cross_origin
import logging

# Configure application
app = Flask(__name__, static_folder='front-app/build', static_url_path='')
#secret key
app.config["SECRET_KEY"] = 'cvO4S87_f-r$jRDHKJ54YUFGFF'

@app.before_first_request
def before_first_request():
    file_handler = logging.StreamHandler()
    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.INFO)

# configure cors
CORS(app)

app.config.update(
    REMEMBER_COOKIE_SECURE = True,
    SESSION_COOKIE_HTTPONLY=True,
    REMEMBER_COOKIE_HTTPONLY = True,
    SESSION_COOKIE_SAMESITE='Lax',
)

# make session permanent
@app.before_request
def make_session_permanent():
    session.permanent = True

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/api", methods=["GET", "POST"])
@cross_origin()
def index():
    return {"hello" : "asdsa"}

@app.route("/")
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)