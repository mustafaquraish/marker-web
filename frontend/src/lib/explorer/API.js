import axios from 'axios';
import FakeAPI from '@/lib/explorer/fake/FakeAPI'

const HOST = process.env.VUE_APP_HOST + "/api/explorer";
var FAKE = false;

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
    async getPath(path, hidden=false) {
        // console.log("Asking for subdir", path)
        return doRequest(
            () => axios.get(HOST + '/path', { params: { path, hidden } }),  /* Real request */
            () => FakeAPI.getPath(path, hidden),       /* Fake request */
        )
    },
    async getParent(path, hidden=false) {
        // console.log("Asking for parent", path, hidden)
        return doRequest(
            () => axios.get(HOST + '/parent', { params : { path, hidden } }),  /* Real request */
            () => FakeAPI.getParent(path, hidden),       /* Fake request */
        )
    },
    async getHome(hidden=false) {
        // console.log("Asking for home", hidden)
        return doRequest(
            () => axios.get(HOST + '/path', { params : { hidden } }),  /* Real request */
            () => FakeAPI.getHome(hidden),       /* Fake request */
        )
    },
    async getFavorites() {
        // console.log("Asking for favs")
        return doRequest(
            () => axios.get(HOST + '/favorites'),  /* Real request */
            () => FakeAPI.getFavorites(),       /* Fake request */
        )
    },
    async addFavorite(path) {
        // console.log("adding favs", path)
        return doRequest(
            () => axios.post(HOST + '/favorites', null, { params: { path } }),  /* Real request */
            () => FakeAPI.addFavorite(path),       /* Fake request */
        )
    },
    async delFavorite(path) {
        // console.log("del favs")
        return doRequest(
            () => axios.delete(HOST + '/favorites', { params: { path } }),  /* Real request */
            () => FakeAPI.delFavorite(path),       /* Fake request */
        )
    },
}
