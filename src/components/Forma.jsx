import { Button, DatePicker, Form, Input, Space, Typography } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { addTodo } from "../store/asyncActions/addTodo";
import { updateTodo } from "../store/asyncActions/updateTodo";
import { addToDoAction, changeToDoAction } from "../store/todoReducer/actions";

import styles from "../index.module.css";

const { Item } = Form;
const { Title } = Typography;
const { TextArea } = Input;

const DEFAULT_FORM_VALUES = {
	title: "",
	body: "",
	time: null,
};

const Forma = ({ edit }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { todo = [] } = useSelector((state) => state.todoReducer);
	const form = useRef(null);

	const defaultValues = useMemo(() => {
		const obj = todo.find((task) => task.id === Number(id));

		if (edit && obj) {
			return { ...obj, time: dayjs(obj.time) };
		}

		return DEFAULT_FORM_VALUES;
	}, [todo, id, edit]);

	useEffect(() => {
		if (form.current) {
			form.current.setFieldsValue(defaultValues);
		}
	}, [defaultValues]);

	const onFinish = (values) => {
		const { id = Date.now(), title, body = "", time, completed = false } = values;

		if (edit) {
			const obj = { userId: 1, ...defaultValues, title, body, time: new Date(time) };
			dispatch(changeToDoAction(obj));
			dispatch(updateTodo(obj));
		} else {
			const obj = { userId: 1, id, title, body, completed, time: new Date(time) };
			dispatch(addToDoAction(obj));
			dispatch(addTodo(obj));
		}

		navigate("/");
	};

	return (
		<Space direction="vertical" align="center" className={styles.blockCenter}>
			<Title align="center">{edit ? "Edit" : "Create"}</Title>
			<Form ref={form} name="form" layout="vertical" onFinish={onFinish} autoComplete="off">
				<Space direction="vertical">
					<Item
						name="title"
						rules={[
							{
								required: true,
								message: "Please input title!",
							},
						]}
					>
						<Input placeholder="Write title" />
					</Item>
					<Item name="body">
						<TextArea placeholder="Write description..." />
					</Item>
					<Space align="start">
						<Item
							name="time"
							rules={[
								{
									required: true,
									message: "Please input time!",
								},
							]}
						>
							<DatePicker showTime format={"MMMM D, YYYY h:mm A"} />
						</Item>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Space>
				</Space>
			</Form>
		</Space>
	);
};

Forma.propTypes = {
	edit: PropTypes.bool,
};

export default Forma;
