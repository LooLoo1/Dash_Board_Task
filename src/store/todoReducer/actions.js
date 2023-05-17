import {
	ADD_TODO,
	CHANGE_FILTER,
	CHANGE_STATUS,
	CHANGE_TODO,
	FETCH_MANY_TODO,
	FETCH_TODO_ERROR,
	FETCH_TODO_SUCCESS,
	REMOVE_TODO,
} from "./constants";

export const addToDoAction = (payload) => ({ type: ADD_TODO, payload });
export const removeToDoAction = (payload) => ({ type: REMOVE_TODO, payload });
export const changeStatusToDoAction = (payload) => ({ type: CHANGE_STATUS, payload });
export const changeToDoAction = (payload) => ({ type: CHANGE_TODO, payload });
export const changeFilterAction = (payload) => ({ type: CHANGE_FILTER, payload });

export const fetchToDoGet = (payload) => ({ type: FETCH_MANY_TODO, payload });
export const fetchToDoSuccess = (payload) => ({ type: FETCH_TODO_SUCCESS, payload });
export const fetchToDoError = (payload) => ({ type: FETCH_TODO_ERROR, payload });
