import { filetree } from "@/lib/explorer/fake/data"

var FAVORITES = [
    "/Users/user1",
    "/Users/user1/Documents/A1",
]

function getFromParts(parts, hidden) {
    let data = {
        path: parts.join("/"),
        entries: [],
    }
    let curDir = parts.reduce((res, item) => {
        if (!res) return undefined;
        if (item == "" || item.length == 0) return res;
        return res.entries[item];
    }, filetree);
    if (!curDir) {
        return undefined;
    }
    for (let [key, value] of Object.entries(curDir.entries)) {
        if (hidden || !key.startsWith(".")) {
            data.entries.push({
                'name': key,
                'path': value.path,
                'dir': value.dir
            });
        }
    }
    let pparts = parts.slice(0, parts.length-1);
    let ppath = pparts.length == 1 ? "/" : pparts.join("/")
    data.entries.push({
        'name': '..',
        'path': ppath,
        'dir': true
    })

    data.entries.sort((a, b)=> {
        if (a.dir == b.dir) {
            return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1;
        } else {
            return (a.dir) ? -1 : 1;
        }
    })
    return data;
}

function getFromPath(path, hidden) {
    let parts = path.split("/");
    return getFromParts(parts, hidden)
}

function basename(path) {
    let parts = path.split("/");
    return parts[parts.length - 1];
}

export default {
    async getPath(path, hidden=false) {
        return getFromPath(path, hidden);
    },
    async getParent(path, hidden=false) {
        let parts = path.split("/");
        parts = parts.splice(0, parts.length-1);
        return getFromParts(parts, hidden);
    },
    async getHome(hidden=false) {
        return getFromPath("/Users/user1",hidden)
    },
    async getFavorites() {
        return FAVORITES.map((item)=>({ 'name': basename(item), 'path': item }));
    },
    async addFavorite(path) {
        if (!FAVORITES.includes(path))
            FAVORITES.push(path)
        return this.getFavorites()
    },
    async delFavorite(path) {
        const index = FAVORITES.indexOf(path);
        if (index > -1) {
            FAVORITES.splice(index, 1);
        }
        return this.getFavorites()
    },
}
