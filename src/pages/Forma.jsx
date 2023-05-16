import * as React from "react";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, DatePicker, Space, Input, Typography } from "antd";
import dayjs from "dayjs";
import { addToDoAction, changeToDoAction } from "../store/todoReducer";

import styles from "../index.module.css";

const { Title } = Typography;
const { TextArea } = Input;

const ToDoForm = ({ edit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { todo = [] } = useSelector(({ todoReducer }) => todoReducer);
  const formRef = useRef(null);

  const [defaultValues, setDefaultValues] = useState({
    id: null,
    title: "",
    body: "",
    time: null,
    completed: false,
  });

  useEffect(() => {
    const toDoItem = todo.find((item) => item.id === Number(id));
    if (edit && toDoItem) {
      const { id, title, body, time, completed } = toDoItem;
      setDefaultValues({ id, title, body, time: dayjs(time), completed });
    }
  }, [todo, id, edit]);

  const handleSubmit = useCallback(
    (values) => {
      if (edit) {
        const { id, completed } = defaultValues;
        const { title, body = "", time } = values;
        dispatch(
          changeToDoAction({
            userId: 1,
            id,
            title,
            body,
            time: new Date(time),
            completed,
          })
        );
      } else {
        const {
          id = Date.now(),
          title,
          body = "",
          time,
          completed = false,
        } = values;
        dispatch(
          addToDoAction({
            userId: 1,
            id,
            title,
            body,
            time: new Date(time),
            completed,
          })
        );
      }
      navigate(-1);
    },
    [dispatch, navigate, edit, defaultValues]
  );

  useEffect(() => {
    if (formRef.current) {
      formRef.current.setFieldsValue(defaultValues);
    }
  }, [defaultValues]);

  const titleField = useMemo(
    () => (
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Please enter a title." }]}
      >
        <Input placeholder="Title" />
      </Form.Item>
    ),
    []
  );

  const bodyField = useMemo(
    () => (
      <Form.Item name="body">
        <TextArea placeholder="Description" />
      </Form.Item>
    ),
    []
  );

  const timeField = useMemo(
    () => (
      <Form.Item
        name="time"
        rules={[{ required: true, message: "Please select a date and time." }]}
      >
        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item>
    ),
    []
  );

  const submitButton = useMemo(
    () => (
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    ),
    []
  );

  return (
	<Space direction="vertical" align="center" className={styles.blockCenter}>
		<Title level={3}>{edit ? "Edit ToDo" : "Add ToDo"}</Title>
		<Form layout="vertical" onFinish={handleSubmit} ref={formRef}>
			{titleField}
			{bodyField}
			<Space align='start'>
				{timeField}
				<Space>{submitButton}</Space>
			</Space>
		</Form>
	</Space>
  );
};

export default ToDoForm;
