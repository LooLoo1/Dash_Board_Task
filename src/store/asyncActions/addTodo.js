import axios from "axios";
import { addToDoAction, removeToDoAction } from "../todoReducer/actions";

export const addTodo = (todo) => async (dispatch) => {
	dispatch(addToDoAction(todo));
	try {
		await axios.post("https://jsonplaceholder.typicode.com/todos", todo);
	} catch (error) {
		dispatch(removeToDoAction(todo.id))
		console.error("Error adding todo:", error);
	}
};