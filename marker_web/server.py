import os
import logging
import sys

from flask import Flask, send_file
from flask_cors import CORS

from marker_web.marker_server.routes import markerBP, setupMarker
from marker_web.explorer_server.routes import explorerBP

logger = logging.getLogger(__name__)

from os.path import dirname, abspath, join, isdir

# # Frozen executable resource path
# curFilePath = dirname(abspath(sys.argv[0]))
# resourcesPath = join(curFilePath, "gui")

# # Local development path
# if not isdir(resourcesPath):
#     resourcesPath = join(dirname(curFilePath), "gui")

# # Packaged to egg:
# if not isdir(resourcesPath):
parentPath = os.path.dirname(os.path.abspath(__file__))
resourcesPath = os.path.join(parentPath, "gui")


app = Flask(__name__,
    static_url_path="",
    static_folder=resourcesPath,
)
CORS(app)

app.register_blueprint(explorerBP, url_prefix='/api/explorer')
app.register_blueprint(markerBP, url_prefix='/api/marker')

### Default route:
index_html_path = join(resourcesPath, "index.html")
@app.route("/")
def route_default():
    return send_file(index_html_path)


def main():
    # Try to run setup the marker in the current directory, but this
    # might fail if command line args are not specified. Don't do
    # anything here, user will be prompted to pick dir in UI.
    setupMarker()

    app.run()

if __name__ == '__main__':
    main()