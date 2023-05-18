import axios from "axios";
import { addToDoAction, removeToDoAction } from "../todoReducer/actions";

export const deleteTodo = (todo) => async (dispatch) => {
	dispatch(removeToDoAction(todo.id));
	try {
		await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todo.id}`);
	} catch (error) {
		dispatch(addToDoAction(todo));
		console.error("Error deleting todo:", error);
	}
};
