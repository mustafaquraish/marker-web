export function sum(list) {
    let total = 0
    for (let i = 0; i < list.length; i++)
        total += list[i]
    return total
}

export function mean(list) {
    return sum(list) / list.length
}

export function median(list) {
    let values = [...list];
    values.sort((a, b) => a - b);
    let mid = Math.floor(values.length / 2);
    let med = 0;
    if (values.length % 2 == 0) {
        med = (values[mid - 1] + values[mid]) / 2;
    } else {
        med = values[mid];
    }
    return med;
}

export function iconText(username) {
    if (username.includes(".")) {
        let parts = username.split(".");
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return username.substring(0, 2).toUpperCase()
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
