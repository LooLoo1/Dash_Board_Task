import { ClockCircleOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Select, Typography } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { changeStatusToDoAction, removeToDoAction } from "../store/todoReducer/actions";

import styles from "../index.module.css";

const { Paragraph } = Typography;

const ToDoCard = ({ data, selectRoleOptions }) => {
	const { id, title, body, time, status } = data;

	const dispatch = useDispatch();

	const handleDeleteClick = useCallback(() => {
		dispatch(removeToDoAction(id));
	}, [dispatch, id]);

	const handleStatusChange = useCallback(
		(status) => {
			dispatch(changeStatusToDoAction({ id, status }));
		},
		[dispatch, id],
	);

	return (
		<Card
			type="inner"
			title={title}
			actions={[
				<Select
					defaultValue={status}
					className={styles.widthFull}
					onChange={handleStatusChange}
					options={selectRoleOptions}
				/>,
				<Link to={`/new/${id}`}>
					<EditOutlined />
				</Link>,
				<DeleteOutlined onClick={handleDeleteClick} />,
			]}
		>
			<Paragraph ellipsis={{ rows: 5 }}>{body}</Paragraph>
			<Paragraph strong>
				{dayjs(time).format("MMMM D, YYYY h:mm A")} <ClockCircleOutlined />
			</Paragraph>
		</Card>
	);
};

ToDoCard.propTypes = {
	data: PropTypes.shape({
		userId: PropTypes.number.isRequired,
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		completed: PropTypes.bool.isRequired,
		time: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
		body: PropTypes.string.isRequired,
	}),
	selectRoleOptions: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		}),
	),
};

export default ToDoCard;
