const defaultStore = {
	todo: [],
	isLoading: false,
	error: null
}

const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const CHANGE_STATUS = 'CHANGE_STATUS'
const CHANGE_TODO = 'CHANGE_TODO'
const FETCH_MANY_TODO = 'FETCH_MANY_TODO'
const FETCH_TODO_SUCCESS = 'FETCH_TODO_SUCCESS'
const FETCH_TODO_ERROR = 'FETCH_TODO_ERROR'

export const todoReducer = (state = defaultStore, action) => {
	switch (action.type) {
		case ADD_TODO:
			return {...state, todo:[...state.todo, action.payload]}
		case REMOVE_TODO:
			return {...state, todo: state.todo.filter(todo => todo.id !== action.payload)}
		case CHANGE_STATUS:
			return {...state, todo: state.todo.map(obj => obj.id === action.payload ? {...obj, completed: !obj.completed } : obj)}
		case CHANGE_TODO:
			return {...state, todo: state.todo.map(obj => obj.id === action.payload.id ? action.payload : obj)}
		case FETCH_MANY_TODO:
			return {...state, isLoading: true}
		case FETCH_TODO_SUCCESS:
			return {...state, isLoading: false, error: null, todo: action.payload}
		case FETCH_TODO_ERROR:
			return {...state, isLoading: false, error: action.payload}
		default:
			return state
	}
}

export const addToDoAction = (payload) => ({type: ADD_TODO, payload})
export const removeToDoAction = (payload) => ({type: REMOVE_TODO, payload})
export const changeStatusToDoAction = (payload) => ({type: CHANGE_STATUS, payload})
export const changeToDoAction = (payload) => ({type: CHANGE_TODO, payload})

export const fetchToDoGet = (payload) => ({type: FETCH_MANY_TODO, payload})
export const fetchToDoSuccess = (payload) => ({type: FETCH_TODO_SUCCESS, payload})
export const fetchToDoError = (payload) => ({type: FETCH_TODO_ERROR, payload})