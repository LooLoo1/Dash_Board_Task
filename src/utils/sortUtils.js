export const sortByTitle = arr => arr.sort((a, b) => a.title.localeCompare(b.title));
export const sortByBody = arr => arr.sort((a, b) => a.body.localeCompare(b.body));
export const sortByTime = arr => arr.sort((a, b) => new Date(a.time) - new Date(b.time));