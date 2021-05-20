import os
import sys

from flask import Flask, send_file
from flask_cors import CORS

from .explorer_server.routes import explorerBP
from .marker_server.routes import markerBP, setupMarker

from .auth import setup_auth, generate_auth_token

# Resource files are located in `marker_web.gui`
parentPath = os.path.dirname(os.path.abspath(__file__))
resourcesPath = os.path.join(parentPath, "gui")

# Frozen executable...
if not os.path.isdir(resourcesPath):
    parentDir = os.path.dirname(os.path.abspath(sys.argv[0]))
    resourcesPath = os.path.join(parentDir, "gui")

app = Flask(__name__,
    static_url_path="",
    static_folder=resourcesPath,
)
CORS(app)


setup_auth(markerBP)
setup_auth(explorerBP)

app.register_blueprint(explorerBP, url_prefix='/api/explorer')
app.register_blueprint(markerBP, url_prefix='/api/marker')

### Default route:
index_html_path = os.path.join(resourcesPath, "index.html")
print(resourcesPath)
@app.route("/")
def route_default():
    return send_file(index_html_path)

PORT = 6275

def main():
    # Try to run setup the marker in the current directory, but this
    # might fail if command line args are not specified. Don't do
    # anything here, user will be prompted to pick dir in UI.
    setupMarker()

    token = generate_auth_token(32)
    print("-"*80)
    print("Generated token: ", token)
    print("-"*80)
    print(f"Running at: http://localhost:{PORT}/#/?auth={token}")
    print("-"*80)

    app.run(debug=False, port=PORT)

if __name__ == '__main__':
    main()
