import { Col, Row, Space, Typography } from "antd";
import { useMemo } from "react";

import { COLUMNS } from "../constants";
import ToDoCard from "./ToDoCard";

import styles from "../index.module.css";

const { Title } = Typography;

const ToDoCardList = ({ filteredTodos }) => {
	const selectRoleOptions = useMemo(() => COLUMNS.map(({ key, title }) => ({ value: key, label: title })), []);

	return (
		<Row gutter={24}>
			{COLUMNS.map(({ key, title }, i) => (
				<Col key={title} span={24 / COLUMNS.length}>
					<Title className={styles.textAlignCenter}>{title}</Title>
					<Space direction="vertical" size="middle" className={`${styles.flex} ${styles.spaceVertical}`}>
						{filteredTodos[key].map((todo) => (
							<ToDoCard key={todo.id} data={todo} selectRoleOptions={selectRoleOptions} />
						))}
					</Space>
				</Col>
			))}
		</Row>
	);
};

export default ToDoCardList;
