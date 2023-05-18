import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { Form, Home } from "./pages";
import { fetchToDo } from "./store/asyncActions/fetchToDo";

const App = () => {
	const dispatch = useDispatch();
	const { todo } = useSelector(({ todoReducer }) => todoReducer);

	useEffect(() => {
		if (!todo?.length) {
			dispatch(fetchToDo());
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("TODO", JSON.stringify(todo));
	}, [todo]);

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/new" element={<Form />} />
			<Route path="/new/:id" element={<Form edit />} />
			<Route path="*" element={<Home />} />
		</Routes>
	);
}

export default App;
