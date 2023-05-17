import { Space } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { FiltersAndButton, Loader, ToDoCardList } from "../components";
import { COLUMNS } from "../constants";
import styles from "../index.module.css";

const Home = () => {
	const { todo: todoList = [], isLoading, error } = useSelector(({ todoReducer }) => todoReducer);
	const [todos, setTodos] = useState(todoList);

	useEffect(() => {
		setTodos(todoList);
	}, [todoList]);

	const filteredTodos = useMemo(() => {
		return COLUMNS.map(({ key }) => todos.filter((todo) => todo.status === key));
	}, [todos]);

	const handleSort = useCallback((sortFunction) => setTodos(sortFunction([...todos])), [todos]);

	if (error) {
		return (
			<div className={`${styles.flex} ${styles.justifyContentCenter} ${styles.colorRed} ${styles.padding}`}>
				<p>{error}</p>
			</div>
		);
	}

	return (
		<Space className={`${styles.padding}`} direction="vertical" size="large">
			<FiltersAndButton handleSort={handleSort} />
			<div className={`${styles.flex} ${styles.justifyContentCenter} ${styles.padding}`}>
				{isLoading ? <Loader /> : <ToDoCardList filteredTodos={filteredTodos} />}
			</div>
		</Space>
	);
};

export default Home;
