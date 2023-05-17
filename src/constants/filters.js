import { sortByBody, sortByTime, sortByTitle } from "../utils/sortUtils";

export const FILTERS = [
    {
        name: "Name",
        handle: sortByTitle,
    },
    {
        name: "Description",
        handle: sortByBody,
    },
    {
        name: "Time",
        handle: sortByTime,
    },
];