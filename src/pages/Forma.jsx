import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, DatePicker, Space, Input, Typography } from "antd";
import styles from '../index.module.css';
import dayjs from 'dayjs';
import { addToDoAction, changeToDoAction } from '../store/todoReducer';


const Forma = ({edit}) => {

	let { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch()
	const {todo = []} = useSelector(state => state.todoReducer)  
	const form = useRef(null)

	const [defaultValues, setDefaultValues] = useState({
		title: '', 
		body: '', 
		time: null
	})

	useEffect(() => {
		const obj = todo.find(e => e.id == id)  
		if (edit && obj) {
			const { id, title, body, time, completed } = obj
			setDefaultValues({ id, title, body, time: dayjs(time), completed } )
		}
	}, [todo, id, edit])

	const onFinish = (values) => {
		if (edit) {
			const {id, completed} = defaultValues
			const { title, body = '', time} = values
			dispatch(changeToDoAction({userId: 1, id, title, body, time: new Date(time), completed}))
			console.log({userId: 1, id, title, body, time: new Date(time), completed});
		} 
		if (!edit) {
			const { id = Date.now(), title, body = '', time , completed = false } = values
			dispatch(addToDoAction({userId: 1, id, title, body, time: new Date(time), completed}))
		}
		navigate(-1)
	};
	
	useEffect(() => {
		if (form.current) {
			form.current.setFieldsValue(defaultValues);
		}
	}, [defaultValues]);

  return (
	<Space direction="vertical" align="center" className={styles.blockCenter}>
		<Typography.Title align="center">{edit ? "Edit" : "Create"}</Typography.Title>
			<Form 
				ref={form}
				name="form" 
				layout="vertical" 
				onFinish={onFinish}
				autoComplete="off"
			>
				<Space direction='vertical'>
					<Form.Item
						name="title"
						rules={[{ required: true, message: 'Please input title!' }]}
					>
						<Input placeholder="Write title"/>		
					</Form.Item>
					<Form.Item
						name="body"
					>
						<Input.TextArea placeholder="Write description..."/>
					</Form.Item>
			
					<Space align='start'>
						<Form.Item
							name="time"
							rules={[{ required: true, message: 'Please input time!' }]}
						>
							<DatePicker showTime format={'MMMM D, YYYY h:mm A'}/>
						</Form.Item>
						<Button type="primary" htmlType="submit">Submit</Button>
					</Space>
				</Space>
			</Form>
		</Space>
  )
}

export default Forma;


