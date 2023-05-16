import axios from "axios";
import { faker } from '@faker-js/faker';
import { fetchToDoGet, fetchToDoSuccess, fetchToDoError } from "../todoReducer"

export const fetchToDo = () => {
	return async dispatch => {
		try {
			dispatch(fetchToDoGet())
			const todo = await axios.get('https://jsonplaceholder.typicode.com/todos', {params: {_limit: 10}})
			const preparedToDos = todo.data.map(obj => (
				{...obj, 
					time: faker.date.anytime(), 
					body: faker.lorem.words(10)
				}
			))
			dispatch(fetchToDoSuccess(preparedToDos))
		} catch (error) {
			dispatch(fetchToDoError(`Error: ${error}`))
		}
	}
}