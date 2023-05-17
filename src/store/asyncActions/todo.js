import { faker } from "@faker-js/faker";
import axios from "axios";
import { COLUMN_TYPES } from "../../constants";
import { fetchToDoError, fetchToDoGet, fetchToDoSuccess } from "../todoReducer/actions";

export const fetchToDo = () => async (dispatch) => {
	try {
		dispatch(fetchToDoGet());
		const todo = await axios.get("https://jsonplaceholder.typicode.com/todos", { params: { _limit: 10 } });
		const preparedToDos = todo.data.map((obj) => ({
			...obj,
			time: faker.date.anytime(),
			body: faker.lorem.words(10),
			status: obj.completed ? COLUMN_TYPES.complete : COLUMN_TYPES.todo,
		}));
		dispatch(fetchToDoSuccess(preparedToDos));
	} catch (error) {
		dispatch(fetchToDoError(`Error: ${error}`));
	}
};
