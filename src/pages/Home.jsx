import * as React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Button, Space, Typography, Col, Row } from "antd";

import styles from '../index.module.css';
import Loader from "../components/Loader";
import ToDoCard from "../components/ToDoCard";

const { Title } = Typography

const Home = () => {
	const cols = ["ToDo", "Complete"]
	const rule = [false, true]
	const navigate = useNavigate();
	const {todo = [], isLoading, error} = useSelector(state => state.todoReducer)
	const [list, setList] = useState([])

	const sortByTitle = arr => arr.sort((a, b) => a.title.localeCompare(b.title));
	const sortByBody = arr => arr.sort((a, b) => a.body.localeCompare(b.body));
	const sortByTime = arr => arr.sort((a, b) => new Date(a.time) - new Date(b.time));

	useEffect(()=>{
		setList(todo)
	},[todo])

	if (error) return <div className={`${styles.flex} ${styles.justifyContentCenter} ${styles.colorRed}`}><p>{error}</p></div>

  return (
	<Space direction="vertical" size="large" className={`${styles.flex} ${styles.padding}`}>
		<Space direction="horizontal" align="end" className={`${styles.flex} ${styles.justifyContentSpaceBetween}`}>
			<Space direction="vertical" className={styles.block}>
				<Title>Filters:</Title>
				<Space.Compact size='large' block>
					<Button type="primary" onClick={()=>{setList([...sortByTitle(todo)])}}>Name</Button>
					<Button type="primary" onClick={()=>{setList([...sortByBody(todo)])}}>Description</Button>
					<Button type="primary" onClick={()=>{setList([...sortByTime(todo)])}}>Time</Button>
			   </Space.Compact>
			</Space>

			<Space direction="vertical">
				<Space align="center">
					<Button type="primary" size={'large'} onClick={()=>{navigate('/new');}}>New ToDo</Button>
				</Space>
			</Space>
		</Space>
		
		<Space className={`${styles.flex} ${styles.justifyContentCenter}`}>
			{isLoading && list.length !== 0
				? <Loader/> 
				:  <Row gutter={24}>
						{cols.map((title, i) => (
							<Col key={title} span={12}>
								<Title className={styles.textAlignCenter}>{title}</Title>
								<Space size="middle" direction="vertical" className={styles.flex}>
									{list.map((card) => (
										<ToDoCard key={card.id} data={card} rule={rule[i]} />
									))}
								</Space>
							</Col>
						))}
					</Row>
			}
		</Space>
	</Space>
  )
}

export default Home