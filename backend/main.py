import os
import logging
import webview
import sys

from contextlib import redirect_stdout
from io import StringIO
import threading

from flask import Flask, send_file
from flask_cors import CORS


from marker_server.routes import markerBP, setupMarker
from explorer_server.routes import explorerBP

logger = logging.getLogger(__name__)

from os.path import dirname, abspath, join, isdir

if __name__ == '__main__':
    # Frozen executable resource path
    curFilePath = dirname(abspath(__file__))
    resourcesPath = join(curFilePath, "gui")
    
    # Local development path
    if not isdir(resourcesPath):
        resourcesPath = join(dirname(curFilePath), "gui")

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

    setupMarker()

    if "noweb" in sys.argv:
        app.run()
    else:
        window = webview.create_window('Marker', app)
        webview.start()
