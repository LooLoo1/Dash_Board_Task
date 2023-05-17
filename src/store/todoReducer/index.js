import { COLUMN_TYPES } from "../../constants";
import { defaultStore, ADD_TODO, CHANGE_STATUS, CHANGE_TODO, FETCH_MANY_TODO, FETCH_TODO_ERROR, FETCH_TODO_SUCCESS, REMOVE_TODO } from "./constants";

export const todoReducer = (state = defaultStore, action) => {
	switch (action.type) {
		case ADD_TODO:
			return { ...state, todo: [...state.todo, { ...action.payload, status: COLUMN_TYPES.todo }] };
		case REMOVE_TODO:
			return { ...state, todo: state.todo.filter((todo) => todo.id !== action.payload) };
		case CHANGE_STATUS:
			return {
				...state,
				todo: state.todo.map((obj) => (obj.id === action.payload.id ? { ...obj, status: action.payload.status } : obj)),
			};
		case CHANGE_TODO:
			return { ...state, todo: state.todo.map((obj) => (obj.id === action.payload.id ? action.payload : obj)) };
		case FETCH_MANY_TODO:
			return { ...state, isLoading: true };
		case FETCH_TODO_SUCCESS:
			return { ...state, isLoading: false, error: null, todo: action.payload };
		case FETCH_TODO_ERROR:
			return { ...state, isLoading: false, error: action.payload };
		default:
			return state;
	}
};
