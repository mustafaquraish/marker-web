import os
import logging
import webview
import sys

from contextlib import redirect_stdout
from io import StringIO
import threading

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

import fileserver.server
import markerserver.server as marker

logger = logging.getLogger(__name__)

# RESOURCES_PATH = 

if __name__ == '__main__':
    curFilePath = os.path.dirname(os.path.abspath(__file__))
    resourcesPath = os.path.join(curFilePath, "gui")                       # Frozen Exec
    print(os.getcwd())
    print(curFilePath)
    if not os.path.isdir(resourcesPath):
        print("Defaulting to local dev path")
        parentDir = os.path.dirname(curFilePath)
        resourcesPath = os.path.join(parentDir, "gui")                      # Local Dev
        print(resourcesPath)

    marker.setup()
    if "noweb" in sys.argv:
        app.run()
    else:
        threading.Thread(target=lambda: app.run(), daemon=True).start()
        window = webview.create_window('My first pywebview application', resourcesPath)
        webview.start(http_server=True, debug=True)
    # app.run()
