import { StarFilled } from "@ant-design/icons";
import { Spin } from "antd";

import styles from "../index.module.css";

const Loader = () => {
	return (
		<div className={styles.loader}>
			<Spin indicator={<StarFilled style={{ color: "#E67700" }} spin />} size="large" />
			<p>Loading...</p>
		</div>
	);
};

export default Loader;
