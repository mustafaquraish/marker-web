import store from '@/store/index.js'
var FAKE = false;

export async function doRequest(func, fakefunc) {
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

export async function handleReponse(func, fakefunc) {
    try {
        return await doRequest(func, fakefunc);
    } catch (err) {
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