import axios from "axios";
import { removeToDoAction } from "../todoReducer/actions";

export const deleteTodo = (todoId) => async (dispatch) => {
	try {
		await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
		dispatch(removeToDoAction(todoId));
	} catch (error) {
		console.error("Error deleting todo:", error);
	}
};