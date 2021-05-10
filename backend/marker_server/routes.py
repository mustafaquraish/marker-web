from flask import Flask, make_response, request, jsonify, Blueprint
from flask_cors import CORS

from marker import Marker
from marker.utils import config
from marker.utils import pushd
from marker.utils.marksheet import Marksheet

from .console import WebConsole
from .jobs import JobTracker
import argparse
import json
import threading
import os
import time

############################# Init Flask ######################################

markerBP = Blueprint('marker', __name__)

############################# Global Variables ################################

MARKER = None
ARGS = []

###############################################################################


@markerBP.route('/')
def route_home():
    message = { 'message': 'Everything is OK here :)' }
    return make_response(message, 200)


@markerBP.route('/config', methods=['GET', 'POST'])
def route_config():
    if request.method == 'GET':
        return MARKER.cfg
    else:
        return make_response("This isn't implemented yet :(", 400)

@markerBP.route('/progress')
def route_progress():
    return JobTracker.getInfo()

@markerBP.route('/stopjob', methods=['POST'])
def route_stop_job():
    JobTracker.setStop()
    for i in range(30):
        if JobTracker.done:
            return make_response("Job stopped.", 200)
        time.sleep(0.1)
    return make_response("There was an error stopping the thread.", 400)
    


###############################################################################
############################# Results #########################################
###############################################################################


@markerBP.route('/results/')
def route_results():
    data = MARKER.getMarksheet().data
    if data is None:
        return make_response({"error": "Marksheet was not found"}, 401)
    response = [ {'username': u, 'marks': m} for u, m in data.items() ]
    return jsonify(response)


@markerBP.route('/results/<string:student_id>', methods=['GET', 'POST'])
def route_single_result(student_id): 
    student_dir = MARKER.getStudentDir(student_id)
    if student_dir is None:
        student_result = { 
            'marked': False, 
            "message": "Student directory doesn't exist. You may need to delete the marksheet and re-download submissions." 
        }
        return student_result

    json_path = f'{student_dir}/{MARKER.cfg["report"]}'
    if not os.path.isfile(json_path):
        student_result = { 
            'marked': False, 
            "message": "Submission is not marked yet."
        }
        return student_result
        
    student_result = json.load(open(json_path))
    # Add the directory onto the result so we can open up vscode :^)
    student_result["folder"] = os.path.abspath(student_dir)
    student_result["marked"] = True
    return student_result

@markerBP.route('/stats')
def route_stats():
    return MARKER.stats(False, [])


###############################################################################
############################# Downloading #####################################
###############################################################################

@markerBP.route('/download', methods=['POST'])
def route_download_all():
    allow_late = request.args.get('allow_late', 'false') == 'true'
    students = [] if request.json is None else request.json
    print("Got students:", students)
    return JobTracker.startInThread(lambda:
        MARKER.download(students, False),
        "Downloading Submissions"
    )
    return make_response("OK", 200)

@markerBP.route('/download/<string:student_id>', methods=['POST'])
def route_download_single(student_id):
    allow_late = request.args.get('allow_late', 'false') == 'true'
    MARKER.download([student_id], allow_late)
    return make_response("Download was successful", 200)


###############################################################################
############################# Preparing #######################################
###############################################################################

@markerBP.route('/prepare', methods=['POST'])
def route_prepare_all():
    students = [] if request.json is None else request.json
    print("Got students:", students)
    return JobTracker.startInThread(lambda:
        MARKER.prepare(students),
        "Preparing Submissions"
    )

@markerBP.route('/prepare/<string:student_id>', methods=['POST'])
def route_prepare_single(student_id):
    MARKER.prepare([student_id])
    return route_single_result(student_id)

###############################################################################
############################# Running #########################################
###############################################################################

@markerBP.route('/run', methods=['POST'])
def route_run_all():
    recompile = request.args.get('recompile', 'false') == 'true'
    run_all = request.args.get('all', 'false') == 'true'
    students = [] if request.json is None else request.json
    print("Got students:", students)
    return JobTracker.startInThread(lambda:
        MARKER.run(students, recompile, run_all, True),
        "Marking Submissions"
    )

@markerBP.route('/run/<string:student_id>', methods=['POST'])
def route_run_single(student_id):
    recompile = request.args.get('recompile', 'false') == 'true'
    MARKER.run([student_id], recompile, False, False)
    return route_single_result(student_id)

###############################################################################
######################### Uploading Marks #####################################
###############################################################################

@markerBP.route('/upload-marks', methods=['POST'])
def route_upload_marks_all():
    students = [] if request.json is None else request.json
    print("Got students:", students)
    return JobTracker.startInThread(lambda:
        MARKER.upload_marks(students),
        "Uploading Marks"
    )

@markerBP.route('/upload-marks/<string:student_id>', methods=['POST'])
def route_upload_marks_single(student_id):
    MARKER.upload_marks([student_id])
    return make_response("Uploading marks successful", 200)

###############################################################################
####################### Uploading Reports #####################################
###############################################################################

@markerBP.route('/upload-reports', methods=['POST'])
def route_upload_reports_all():
    students = [] if request.json is None else request.json
    print("Got students:", students)
    return JobTracker.startInThread(lambda:
        MARKER.upload_reports(students),
        "Uploading reports"
    )

@markerBP.route('/upload-reports/<string:student_id>', methods=['POST'])
def route_upload_reports_single(student_id):
    MARKER.upload_reports([student_id])
    return make_response("Uploading reports successful", 200)

###############################################################################
####################### Deleting Reports ##########*###########################
###############################################################################

@markerBP.route('/delete-reports', methods=['POST'])
def route_delete_reports_all():
    students = [] if request.json is None else request.json
    print("Got students:", students)
    return JobTracker.startInThread(lambda:
        MARKER.delete_reports(students),
        "Deleting reports"
    )

@markerBP.route('/delete-reports/<string:student_id>', methods=['POST'])
def route_delete_reports_single(student_id):
    MARKER.delete_reports([student_id])
    return make_response("Deleting reports successful", 200)

###############################################################################
###############################################################################
###############################################################################


@markerBP.route('/<path:u_path>')
def route_catch_all(u_path):
    message = { 'message': 'Roses are red, violets are blue. This page is empty, I can\'t help you :(' }
    return make_response(message, 404)


###############################################################################
###############################################################################
###############################################################################

from .utils import parseArgs

def updateMarker(args):
    global ARGS
    global MARKER

    ARGS = args
    MARKER = Marker(args, WebConsole())

def setupMarker():
    args = parseArgs()
    updateMarker(args)

if __name__ == '__main__':
    main()