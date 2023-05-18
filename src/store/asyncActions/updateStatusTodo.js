import axios from "axios";
import { changeStatusToDoAction } from "../todoReducer/actions";

export const updateStatusTodo =
	(todo, { id, status }) =>
	async (dispatch) => {
		dispatch(changeStatusToDoAction({ id, status }));
		try {
			await axios.patch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, { ...todo, status });
		} catch (error) {
			dispatch(changeStatusToDoAction({ id, status: todo.status }));
			console.error("Error updating todo:", error);
		}
	};
