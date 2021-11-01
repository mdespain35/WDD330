export function writeToLS(type, todo) {
    localStorage.setItem(type, JSON.stringify(todo));
}

export function readFromLS(type) {
    return JSON.parse(localStorage.getItem(type));
}