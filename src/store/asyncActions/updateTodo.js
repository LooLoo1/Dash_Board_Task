import axios from "axios";
import { changeToDoAction } from "../todoReducer/actions";

export const updateTodo = (todo) => async (dispatch) => {
	try {
		const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, todo);
		const updatedTodo = response.data;
		dispatch(changeToDoAction(updatedTodo));
	} catch (error) {
		console.error("Error updating todo:", error);
	}
};