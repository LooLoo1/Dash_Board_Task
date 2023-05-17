import { Button, Space, Typography } from "antd";
import PropTypes from "prop-types";
import { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { FILTERS } from "../constants/filters";
import styles from "../index.module.css";
import { changeFilterAction } from "../store/todoReducer/actions";

const { Title } = Typography;

const Filters = ({ handleSort }) => {
	const { filter } = useSelector(({ todoReducer }) => todoReducer);
	const dispatch = useDispatch();

	const handleButtonClick = useCallback(
		(handle, name) => {
			dispatch(changeFilterAction(name));
			handleSort(handle);
		},
		[dispatch, handleSort],
	);

	return (
		<Space direction="vertical" className={styles.block}>
			<Title>Filters:</Title>
			<Space.Compact size="large" block>
				{FILTERS.map(({ name, handle }) => (
					<Button
						key={name}
						type={filter === name ? "primary" : "default"}
						onClick={() => handleButtonClick(handle, name)}
					>
						{name}
					</Button>
				))}
			</Space.Compact>
		</Space>
	);
};

Filters.propTypes = {
	handleSort: PropTypes.func.isRequired,
};

export default Filters;
