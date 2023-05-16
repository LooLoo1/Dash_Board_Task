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
	const dispatch = useDispatch()
	const navigate = useNavigate();
	
	if (rule !== data.completed ) return null
	return (
		<Card
			type="inner"
			title={data.title}
			actions={[
				<CheckCircleOutlined onClick={()=>{dispatch(changeStatusToDoAction(data.id))}}/>,
				<EditOutlined onClick={()=>{navigate(`/new/${data.id}`)}}/>,
				<DeleteOutlined onClick={()=>{dispatch(removeToDoAction(data.id))}}/>
			]}
		>
			<Paragraph ellipsis={{rows: 5}}>{data.body}</Paragraph>
			<Paragraph strong>{dayjs(data.time).format('MMMM D, YYYY h:mm A')} <ClockCircleOutlined /></Paragraph>
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