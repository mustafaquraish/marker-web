import { testresult, config } from "@/lib/marker/fake/data"

function getPlatformPath() {
    var OSName = "Unknown";
    if (window.navigator.userAgent.indexOf("Windows NT 10.0")!= -1) OSName="Windows 10";
    if (OSName.includes("Windows")) { return "c:/" } 
    else { return "/" }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var JOB = {
    name: "Download",
    progress: 100,
    total: 100,
    done: true,
    errors: false,
    killed: false,
    logs: "hhh",
}

var CWD = "/Users/user1"

export default {
    async getMarkerState() {
        await sleep(1000);
        let isValid = (CWD == "/Users/user1/Documents/A1");
        return {
            valid: isValid,
            path: CWD,
            config: isValid ? config : undefined,
        }
    },
    async setMarkerPath(path) {
        CWD = path.slice();
        if (CWD == "/Users/user1/Documents/A1")
            return { "OK": "OK" };
        else
            throw Error("Invalid Dir")
    },

    async getAllResults() {
        let ulist = [
            { username: 'john', marks: [2, 0, 1, 0, 1] },
            { username: 'helen', marks: [] },
            { username: 'smith', marks: [2, 0, 2, 0, 0] },
            { username: 'lucy', marks: [0, 2, 0, 0, 1] },
            { username: 'james', marks: [5, 2, 1, 0, 0] },
            { username: 'ben', marks: [] },
            { username: 'kate', marks: [4, 1, 0, 1, 0] },
        ];
        for (let i = 0; i < 2; i++) {
            ulist = ulist.concat(ulist);
        }
        return ulist;
    },
    async getStudentResults(student) {
        await sleep(500)
        return {
            "data": JSON.stringify(testresult),
            "path": getPlatformPath(),
            "marked": "true"
        };
    },
    async getStats() {
        return {
            "total_marked": 248,
            "compile_success": 153,
            "compile_failed": 95,
            "all": {
                "mean": 2.91,
                "median": 3
            },
            "compiled": {
                "mean": 4.72,
                "median": 6
            },
            "distribution": {
                "0": 108,
                "1": 8,
                "2": 7,
                "3": 4,
                "4": 7,
                "5": 23,
                "6": 91
            }
        };
    }, 
    async runTestsSingle(username, recompile) {
        await sleep(500);
        return this.getStudentResults(username);
    },
    async downloadSingle(username, allow_late) {
        await sleep(1000);
        return { "OK": ":)" };
    },
    async getConfig() {
        await sleep(200);
        return config;
    },
    async runJob(name="Downloading") {
        if (JOB.done == false) {
            throw Error("Another job is running");
        }
        // console.log("Resetting the job...")
        JOB.name = name
        JOB.progress = 0;
        JOB.killed = false;
        JOB.done = false;
        JOB.logs = "";
        return { "started": "ok" };
    },
    async getJob() {
        // console.log("Asking for progress:")
        let done = JOB.progress >= 100 || JOB.killed;
        if (!done) {
            JOB.progress += Math.floor(Math.random() * 20);
            JOB.logs += "Example log: " + JOB.progress.toString()  + "%\n"
            if (JOB.progress > 100) {
                JOB.progress = 100
                JOB.logs += "Job finished! :)"
            }
            done = JOB.progress >= 100;
        }
        JOB.done = done;
        return JOB;
    },
    async stopJob() {
        if (!JOB.done) {
            JOB.killed = true;
        }
        await sleep(1);
        return {"ok": "dude"}
    }

}