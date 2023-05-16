import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Col, Row, Space } from 'antd';

import styles from '../index.module.css';
import Loader from '../components/Loader';
import ToDoCard from '../components/ToDoCard';
import { sortByTitle, sortByBody, sortByTime } from '../utils/sortUtils';

const { Title } = Typography;

const Home = () => {
  const columns = ['ToDo', 'Complete'];
  const rules = [false, true];
  const navigate = useNavigate();
  const { todo: todoList = [], isLoading, error } = useSelector(({ todoReducer }) => todoReducer);
  const [todos, setTodos] = useState(todoList);

  useEffect(() => {
    setTodos(todoList);
  }, [todoList]);

  const handleSort = (sortFunction) => {
    const sortedList = sortFunction([...todos]);
    setTodos(sortedList);
  };

  const handleNewTodo = () => {
    navigate('/new');
  };

  return (
    <>
      {error && (
        <div className={`${styles.flex} ${styles.justifyContentCenter} ${styles.colorRed} ${styles.padding}`}>
          <p>{error}</p>
        </div>
      )}
      {!error && (
        <>
          <Space  direction="vertical" size="large" className={`${styles.flex} ${styles.padding}`}>
				<Space direction="horizontal" align="end" className={`${styles.flex} ${styles.justifyContentSpaceBetween}`}>
					<Space direction="vertical" className={styles.block}>
						<Title>Filters:</Title>
						<Space.Compact size='large' block>
							<Button type="primary" onClick={() => handleSort(sortByTitle)}>Name</Button>
							<Button type="primary" onClick={() => handleSort(sortByBody)}>Description</Button>
							<Button type="primary" onClick={() => handleSort(sortByTime)}>Time</Button>
						</Space.Compact>
					</Space>

					<Space direction="vertical">
						<Space align="center">
							<Button type="primary" size="large" onClick={handleNewTodo}>New ToDo</Button>
						</Space>
					</Space>
				</Space>
          </Space>
          <div className={`${styles.flex} ${styles.justifyContentCenter} ${styles.padding}`}>
            {isLoading ? (
              <Loader />
            ) : (
              <Row gutter={24}>
                {columns.map((title, i) => (
                  <Col key={title} span={12}>
                    <Title className={`${styles.textAlignCenter}`}>{title}</Title>
                    <Space direction="vertical" size={"middle"} className={`${styles.flex} ${styles.spaceVertical}`}>
                      {todos.map((todo) => (
                        <ToDoCard key={todo.id} data={todo} rule={rules[i]} />
                      ))}
                    </Space>
                  </Col>
					))}
         		</Row>
       		 )}
				</div>
			</>
		)}
		</>
		);
};

export default Home;