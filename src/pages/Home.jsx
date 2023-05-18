import { Space } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { FiltersAndButton, Loader, ToDoCardList } from "../components";
import { COLUMNS, FILTERS } from "../constants";

import styles from "../index.module.css";

const Home = () => {
	const { todo: todoList = [], isLoading, error, filter } = useSelector(({ todoReducer }) => todoReducer);
	const [todos, setTodos] = useState(todoList);

	useEffect(() => {
		setTodos(todoList);
	}, [todoList]);

	const handleSort = useCallback((sortFunction) => setTodos(sortFunction([...todos])), [todos]);

	const sortedTodos = useMemo(() => {
		if (filter) {
			const filterConfig = FILTERS.find((item) => item.name === filter);
			if (filterConfig && filterConfig.handle) {
				return filterConfig.handle([...todos]);
			}
		}
		return todos;
	}, [filter, todos]);

	const filteredTodos = useMemo(() => {
		const todosByStatus = {};
		COLUMNS.forEach(({ key }) => {
			todosByStatus[key] = sortedTodos.filter((todo) => todo.status === key);
		});
		return todosByStatus;
	}, [sortedTodos]);

	if (error) {
		return (
			<div className={`${styles.flex} ${styles.justifyCenter} ${styles.colorRed} ${styles.padding}`}>
				<p>{error}</p>
			</div>
		);
	}

	return (
		<Space className={`${styles.block} ${styles.padding}`} direction="vertical" size="large">
			<FiltersAndButton handleSort={handleSort} />
			<div className={`${styles.flex} ${styles.justifyCenter} ${styles.padding}`}>
				{isLoading ? <Loader /> : <ToDoCardList filteredTodos={filteredTodos} />}
			</div>
		</Space>
	);
};

export default Home;
