from server import app
from marker_server.routes import setupMarker

import webview



def main():
    # Try to run setup the marker in the current directory, but this
    # might fail if command line args are not specified. Don't do
    # anything here, user will be prompted to pick dir in UI.
    setupMarker()

    window = webview.create_window('Marker', app, width=1280, height=800, easy_drag=True)
    webview.start()

if __name__ == '__main__':
    main()  