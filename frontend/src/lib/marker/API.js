import axios from 'axios';
import FakeAPI from '@/lib/marker/fake/FakeAPI'
import store from '@/store/index.js'

const HOST = process.env.VUE_APP_HOST + "/api/marker";
var FAKE = false;

async function doRequest(func, fakefunc) {
    if (FAKE) {
        return await fakefunc();
    }
    try {
        let resp = await func();
        return resp.data;
    } catch (err) {
        // This is an error thrown from the marker, caller handles
        if (err.response) {
            console.log("Error occured, but caller should handle this one...")
            return Promise.reject(err)
        } else {
            FAKE = true;
            console.log("Could not connect to server, defaulting to fake data")
            return fakefunc();
        }
    }
}

async function handleReponse(func, fakefunc) {
    try {
        return await doRequest(func, fakefunc);
    } catch (err) {
        console.log("GOT ERROR:", err)
        if (!err.response.data || !err.response.data.message) {
            store.dispatch('showSnackBar', "Unknown error")
            return Promise.reject(err)
        }
        let message = err.response.data.message;
        if (message == "no_token") {
            store.commit('setTokenDialog', true)
        } else if (message == "busy") {
            store.dispatch('showSnackBar', "Another job is currently running.")
        } else {
            store.dispatch('showErrorDialog', {
                message: err.response.data.message
            })
            store.commit('setErrorMessage', err.response.data.message)
        }
        return Promise.reject(err)
    }
}

export default {
    ////////////////////////////////////////////////////////////////////////////////////
    
    async getMarkerState() {
        return handleReponse(
            () => axios.get(HOST + "/state"),     /* Real request */
            () => FakeAPI.getMarkerState(),       /* Fake request */
        )
    },

    async setMarkerPath(path) {
        return handleReponse(
            () => axios.post(HOST + "/state", null, { params: { path } }),  /* Real request */
            () => FakeAPI.setMarkerPath(path),                              /* Fake request */
        )
    },
    
    ////////////////////////////////////////////////////////////////////////////////////
    
    async saveToken(token) {
        return handleReponse(
            () => axios.post(HOST + "/tokens", null, { params: { token } }),     /* Real request */
            () => FakeAPI.noop(),       /* Fake request */
        )
    },
    
    
    ////////////////////////////////////////////////////////////////////////////////////

    async getAllResults() {
        // console.log("Asking for all results...")
        return handleReponse(
            () => axios.get(HOST + "/results"),  /* Real request */
            () => FakeAPI.getAllResults(),       /* Fake request */
        )
    },

    async getStudentResults(student) {
        return handleReponse(
            () => axios.get(HOST + "/results/" + student),  /* Real request */
            () => FakeAPI.getStudentResults(),       /* Fake request */
        )
    },

    ////////////////////////////////////////////////////////////////////////////////////

    async getStats() {
        return handleReponse(
            () => axios.get(HOST + "/stats"),  /* Real request */
            () => FakeAPI.getStats(),       /* Fake request */
        )
    },

    ////////////////////////////////////////////////////////////////////////////////////

    async downloadSingle(username, allow_late) {
        return handleReponse(
            () => axios.post(HOST + "/download/" + username, null, { params: { allow_late } }),  /* Real request */
            () => FakeAPI.downloadSingle(),       /* Fake request */
        )
    },

    async downloadAll(usernames, allow_late) {
        return handleReponse(
            () => axios.post(HOST + "/download", usernames, { params: { allow_late } }),  /* Real request */
            () => FakeAPI.runJob("Downloading Submissions"),       /* Fake request */
        )
    },

    ////////////////////////////////////////////////////////////////////////////////////

    async prepareSingle(username) {
        return handleReponse(
            () => axios.post(HOST + "/prepare/" + username, null),  /* Real request */
            () => FakeAPI.downloadSingle(),       /* Fake request */
        )
    },

    async prepareAll(usernames) {
        return handleReponse(
            () => axios.post(HOST + "/prepare", usernames),  /* Real request */
            () => FakeAPI.runJob("Preparing Submissions"),       /* Fake request */
        )
    },

    ////////////////////////////////////////////////////////////////////////////////////

    async runTestsSingle(username, recompile) {
        return handleReponse(
            () => axios.post(HOST + "/run/" + username, null, { params: { recompile } }),  /* Real request */
            () => FakeAPI.runTestsSingle(),       /* Fake request */
        )
    },
    async runTestsAll(usernames, recompile) {
        return handleReponse(
            () => axios.post(HOST + "/run", usernames, { params: { recompile } }),  /* Real request */
            () => FakeAPI.runJob("Running tests"),       /* Fake request */
        )
    },

    ////////////////////////////////////////////////////////////////////////////////////

    async uploadMarksSingle(username) {
        return handleReponse(
            () => axios.post(HOST + "/upload-marks/" + username, null),  /* Real request */
            () => FakeAPI.downloadSingle(),                              /* Fake request */
        )
    },

    async uploadMarksAll(usernames) {
        return handleReponse(
            () => axios.post(HOST + "/upload-marks", usernames),  /* Real request */
            () => FakeAPI.runJob("Uploading Marks"),              /* Fake request */
        )
    },

    ////////////////////////////////////////////////////////////////////////////////////

    async uploadReportsSingle(username) {
        return handleReponse(
            () => axios.post(HOST + "/upload-reports/" + username, null),  /* Real request */
            () => FakeAPI.downloadSingle(),                                /* Fake request */
        )
    },

    async uploadReportsAll(usernames) {
        return handleReponse(
            () => axios.post(HOST + "/upload-reports", usernames),  /* Real request */
            () => FakeAPI.runJob("Uploading Reports"),              /* Fake request */
        )
    },

    ////////////////////////////////////////////////////////////////////////////////////

    async deleteReportsSingle(username) {
        return handleReponse(
            () => axios.post(HOST + "/delete-reports/" + username, null),  /* Real request */
            () => FakeAPI.downloadSingle(),                                /* Fake request */
        )
    },

    async deleteReportsAll(usernames) {
        return handleReponse(
            () => axios.post(HOST + "/delete-reports", usernames),  /* Real request */
            () => FakeAPI.runJob("Deleting Reports"),               /* Fake request */
        )
    },

    ////////////////////////////////////////////////////////////////////////////////////

    async setStatusSingle(status, username) {
        return handleReponse(
            () => axios.post(HOST + "/set-status/" + username, null, { params: { status } }),  /* Real request */
            () => FakeAPI.downloadSingle(),                                /* Fake request */
        )
    },

    async setStatusAll(status, usernames) {
        return handleReponse(
            () => axios.post(HOST + "/set-status", usernames, { params: { status } }),  /* Real request */
            () => FakeAPI.runJob("Setting status " + status),               /* Fake request */
        )
    },

    ////////////////////////////////////////////////////////////////////////////////////
    

    async getConfig() {
        return handleReponse(
            () => axios.get(HOST + "/config"),  /* Real request */
            () => FakeAPI.getConfig(),          /* Fake request */
        )
    },

    async getJob() {
        return handleReponse(
            () => axios.get(HOST + "/progress"),  /* Real request */
            () => FakeAPI.getJob(),               /* Fake request */
        )
    },

    async runJob() {
        return handleReponse(
            () => FakeAPI.runJob(),       /* Real request */
            () => FakeAPI.runJob(),       /* Fake request */
        )
    },

    async stopJob() {
        return handleReponse(
            () => axios.post(HOST + "/stopjob"),  /* Real request */
            () => FakeAPI.stopJob(),              /* Fake request */
        )
    },
}
