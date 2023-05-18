import axios from "axios";
import { addToDoAction } from "../todoReducer/actions";

export const addTodo = (todo) => async (dispatch) => {
	try {
		const response = await axios.post("https://jsonplaceholder.typicode.com/todos", todo);
		const addedTodo = response.data;
		dispatch(addToDoAction(addedTodo));
	} catch (error) {
		console.error("Error adding todo:", error);
	}
};
