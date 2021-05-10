import axios from 'axios';
import FakeAPI from '@/lib/marker/fake/FakeAPI'

const HOST = "http://127.0.0.1:5000";

var FAKE;
FAKE = false;
// FAKE = true;

async function doRequest(func, fakefunc) {
    if (FAKE) {
        return await fakefunc();
    }
    try {
        let resp = await func();
        return resp.data;
    } catch (error) {
        // This is an error thrown from the marker, caller handles
        if (error.response) {
            console.log("Error occured, but caller should handle this one...")
            throw error;
        } else {
            FAKE = true;
            console.log("Could not connect to server, defaulting to fake data")
            return fakefunc();
        }
    }
}

export default {
    ////////////////////////////////////////////////////////////////////////////////////

    async getAllResults() {
        // console.log("Asking for all results...")
        return doRequest(
            () => axios.get(HOST + "/results"),  /* Real request */
            () => FakeAPI.getAllResults(),       /* Fake request */
        )
    },

    async getStudentResults(student) {
        return doRequest(
            () => axios.get(HOST + "/results/" + student),  /* Real request */
            () => FakeAPI.getStudentResults(),       /* Fake request */
        )
    },

    ////////////////////////////////////////////////////////////////////////////////////

    async getStats() {
        return doRequest(
            () => axios.get(HOST + "/stats"),  /* Real request */
            () => FakeAPI.getStats(),       /* Fake request */
        )
    },

    ////////////////////////////////////////////////////////////////////////////////////

    async downloadSingle(username, allow_late) {
        return doRequest(
            () => axios.post(HOST + "/download/" + username, null, { params: { allow_late } }),  /* Real request */
            () => FakeAPI.downloadSingle(),       /* Fake request */
        )
    },

    async downloadAll(usernames, allow_late) {
        return doRequest(
            () => axios.post(HOST + "/download", usernames, { params: { allow_late } }),  /* Real request */
            () => FakeAPI.runJob("Downloading Submissions"),       /* Fake request */
        )
    },

    ////////////////////////////////////////////////////////////////////////////////////

    async prepareSingle(username) {
        return doRequest(
            () => axios.post(HOST + "/prepare/" + username, null),  /* Real request */
            () => FakeAPI.downloadSingle(),       /* Fake request */
        )
    },

    async prepareAll(usernames) {
        return doRequest(
            () => axios.post(HOST + "/prepare", usernames),  /* Real request */
            () => FakeAPI.runJob("Preparing Submissions"),       /* Fake request */
        )
    },

    ////////////////////////////////////////////////////////////////////////////////////

    async runTestsSingle(username, recompile) {
        return doRequest(
            () => axios.post(HOST + "/run/" + username, null, { params: { recompile } }),  /* Real request */
            () => FakeAPI.runTestsSingle(),       /* Fake request */
        )
    },
    async runTestsAll(usernames, recompile) {
        return doRequest(
            () => axios.post(HOST + "/run", usernames, { params: { recompile } }),  /* Real request */
            () => FakeAPI.runJob("Running tests"),       /* Fake request */
        )
    },

    ////////////////////////////////////////////////////////////////////////////////////

    async uploadMarksSingle(username) {
        return doRequest(
            () => axios.post(HOST + "/upload-marks/" + username, null),  /* Real request */
            () => FakeAPI.downloadSingle(),                              /* Fake request */
        )
    },

    async uploadMarksAll(usernames) {
        return doRequest(
            () => axios.post(HOST + "/upload-marks", usernames),  /* Real request */
            () => FakeAPI.runJob("Uploading Marks"),              /* Fake request */
        )
    },

    ////////////////////////////////////////////////////////////////////////////////////

    async uploadReportsSingle(username) {
        return doRequest(
            () => axios.post(HOST + "/upload-reports/" + username, null),  /* Real request */
            () => FakeAPI.downloadSingle(),                                /* Fake request */
        )
    },

    async uploadReportsAll(usernames) {
        return doRequest(
            () => axios.post(HOST + "/upload-reports", usernames),  /* Real request */
            () => FakeAPI.runJob("Uploading Reports"),              /* Fake request */
        )
    },

    ////////////////////////////////////////////////////////////////////////////////////

    async deleteReportsSingle(username) {
        return doRequest(
            () => axios.post(HOST + "/delete-reports/" + username, null),  /* Real request */
            () => FakeAPI.downloadSingle(),                                /* Fake request */
        )
    },

    async deleteReportsAll(usernames) {
        return doRequest(
            () => axios.post(HOST + "/delete-reports", usernames),  /* Real request */
            () => FakeAPI.runJob("Deleting Reports"),               /* Fake request */
        )
    },


    async getConfig() {
        return doRequest(
            () => axios.get(HOST + "/config"),  /* Real request */
            () => FakeAPI.getConfig(),          /* Fake request */
        )
    },

    async getJob() {
        return doRequest(
            () => axios.get(HOST + "/progress"),  /* Real request */
            () => FakeAPI.getJob(),               /* Fake request */
        )
    },

    async runJob() {
        return doRequest(
            () => FakeAPI.runJob(),       /* Real request */
            () => FakeAPI.runJob(),       /* Fake request */
        )
    },

    async stopJob() {
        return doRequest(
            () => axios.post(HOST + "/stopjob"),  /* Real request */
            () => FakeAPI.stopJob(),              /* Fake request */
        )
    },
}
