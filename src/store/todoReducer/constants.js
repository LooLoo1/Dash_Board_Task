export const defaultStore = {
	todo: JSON.parse(localStorage.getItem("TODO")) || [],
	isLoading: false,
	error: null,
	filter: null,
};

export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const CHANGE_STATUS = "CHANGE_STATUS";
export const CHANGE_TODO = "CHANGE_TODO";
export const CHANGE_FILTER = "CHANGE_FILTER";
export const FETCH_MANY_TODO = "FETCH_MANY_TODO";
export const FETCH_TODO_SUCCESS = "FETCH_TODO_SUCCESS";
export const FETCH_TODO_ERROR = "FETCH_TODO_ERROR";
