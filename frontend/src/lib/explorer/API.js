import axios from 'axios';
import FakeAPI from '@/lib/explorer/fake/FakeAPI'
import { handleReponse } from '@/lib/handler'

const HOST = process.env.VUE_APP_HOST + "/api/explorer";

export default {
    async getPath(path, hidden=false) {
        return handleReponse(
            () => axios.get(HOST + '/path', { params: { path, hidden } }),  /* Real request */
            () => FakeAPI.getPath(path, hidden),       /* Fake request */
        )
    },
    async getParent(path, hidden=false) {
        return handleReponse(
            () => axios.get(HOST + '/parent', { params : { path, hidden } }),  /* Real request */
            () => FakeAPI.getParent(path, hidden),       /* Fake request */
        )
    },
    async getHome(hidden=false) {
        return handleReponse(
            () => axios.get(HOST + '/path', { params : { hidden } }),  /* Real request */
            () => FakeAPI.getHome(hidden),       /* Fake request */
        )
    },
    async getFavorites() {
        return handleReponse(
            () => axios.get(HOST + '/favorites'),  /* Real request */
            () => FakeAPI.getFavorites(),       /* Fake request */
        )
    },
    async addFavorite(path) {
        return handleReponse(
            () => axios.post(HOST + '/favorites', null, { params: { path } }),  /* Real request */
            () => FakeAPI.addFavorite(path),       /* Fake request */
        )
    },
    async delFavorite(path) {
        return handleReponse(
            () => axios.delete(HOST + '/favorites', { params: { path } }),  /* Real request */
            () => FakeAPI.delFavorite(path),       /* Fake request */
        )
    },
}
