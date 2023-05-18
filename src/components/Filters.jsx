import { Button, Space, Typography } from "antd";
import PropTypes from "prop-types";
import { memo, useCallback } from "react";

import { connect, useDispatch } from "react-redux";
import { FILTERS } from "../constants";
import { changeFilterAction, getFilter } from "../store/todoReducer/actions";

import styles from "../index.module.css";

const { Title } = Typography;

const Filters = memo(({ filter, handleSort }) => {
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
});

const mapStateToProps = (state) => {
	return {
		filter: getFilter(state),
	};
};

Filters.propTypes = {
	filter: PropTypes.string,
	handleSort: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Filters);
