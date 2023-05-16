import * as React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import { Typography, Card } from "antd";
import {
	EditOutlined,
	CheckCircleOutlined,
	DeleteOutlined,
	ClockCircleOutlined
} from '@ant-design/icons';

import dayjs from "dayjs";
import { changeStatusToDoAction, removeToDoAction } from '../store/todoReducer';

const { Paragraph } = Typography

const ToDoCard = ({ data, rule }) => {

	const {id, title, body, time, completed} = data

	const dispatch = useDispatch()
	const navigate = useNavigate();

	const handleStatusChange = () => {
		dispatch(changeStatusToDoAction(id));
	 };
  
	 const handleEditClick = () => {
		navigate(`/new/${id}`);
	 };
  
	 const handleDeleteClick = () => {
		dispatch(removeToDoAction(id));
	 };
	
	if (rule !== completed ) return null
	return (
		<Card
			type="inner"
			title={title}
			actions={[
				<CheckCircleOutlined onClick={() => {handleStatusChange()}}/>,
				<EditOutlined onClick={() => {handleEditClick()}}/>,
				<DeleteOutlined onClick={() => {handleDeleteClick()}}/>
			]}
		>
			<Paragraph ellipsis={{rows: 5}}>{body}</Paragraph>
			<Paragraph strong>{dayjs(time).format('MMMM D, YYYY h:mm A')} <ClockCircleOutlined /></Paragraph>
		</Card>
	)
}

ToDoCard.propTypes = {
	data: PropTypes.shape({
	  userId: PropTypes.number.isRequired,
	  id: PropTypes.number.isRequired,
	  title: PropTypes.string.isRequired,
	  completed: PropTypes.bool.isRequired,
	  time: PropTypes.instanceOf(Date).isRequired,
	  body: PropTypes.string.isRequired
	}),
	rule: PropTypes.bool.isRequired
 };

export default ToDoCard