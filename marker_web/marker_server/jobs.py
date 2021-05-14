from flask import make_response
import threading 
import sys

class JobTracker:
    name = "No jobs added yet."
    progress = 100
    total = 100
    done = True
    errors = False
    logs = ""
    killed = False
    jobType = "none"

    # Threads will check this to see if they
    # Should stop processing and exit.
    shouldExitNow = False

    @staticmethod
    def isBusy():
        return JobTracker.done == False

    @staticmethod
    def setJob(name, jobType):
        if JobTracker.isBusy():
            return False
        JobTracker.name = name
        JobTracker.progress = 0
        JobTracker.total = 0
        JobTracker.done = False
        JobTracker.errors = False
        JobTracker.killed = False
        JobTracker.logs = ""
        JobTracker.jobType = jobType
    
    @staticmethod
    def getInfo():
        return { 
            'name': JobTracker.name,
            'progress': JobTracker.progress,
            'total': JobTracker.total,
            'done': JobTracker.done,
            'errors': JobTracker.errors,
            'logs': JobTracker.logs,
            'killed': JobTracker.killed,
            'type': JobTracker.jobType
        }
    
    @staticmethod
    def setTotal(total):
        JobTracker.total = total
    
    @staticmethod
    def updateProgress(inc=1):
        JobTracker.progress += inc
        print("Updating progress:", JobTracker.progress, " //", JobTracker.total, end="\r")

    @staticmethod
    def finishJob():
        JobTracker.done = True
        JobTracker.progress = JobTracker.total
        print("Job done :)")

    @staticmethod
    def addMessage(msg):
        JobTracker.logs += msg + "\n"
        
    @staticmethod
    def startInThread(func, label="Processing...", jobType=""):
        if JobTracker.isBusy():
            return make_response("Busy.", 409)

        # Make an auxiliary function that always runs `finishJob`
        def wrapper():
            func()
            JobTracker.finishJob()
        
        # Reset old values before starting...
        JobTracker.setJob(label, jobType)
        threading.Thread(target=wrapper).start()
        return make_response("Job started!", 200)

    @staticmethod
    def setStop():
        if (JobTracker.isBusy()):
            JobTracker.shouldExitNow = True
            print("Setting stop flag")
        else:
            print("Got request to stop, but no job running.")

    @staticmethod
    def threadExit():
        JobTracker.addMessage("STOP: The job was stopped")
        JobTracker.done = True
        JobTracker.total = 0
        JobTracker.shouldExitNow = False
        JobTracker.errors = True
        JobTracker.killed = True
        print("Killing thread now.")
        sys.exit()
