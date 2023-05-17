import { Button, Space } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import styles from "../index.module.css";
import Filters from "./Filters";

const FiltersAndButton = ({ handleSort }) => {
	return (
		<Space className={styles.widthFull} direction="vertical" size="large">
			<Space className={`${styles.flex} ${styles.justifyContentSpaceBetween}`} direction="horizontal" align="end">
				<Filters handleSort={handleSort} />
				<Space direction="vertical">
					<Space align="center">
						<Link to="/new">
							<Button type="primary" size="large">
								New ToDo
							</Button>
						</Link>
					</Space>
				</Space>
			</Space>
		</Space>
	);
};

FiltersAndButton.propTypes = {
	handleSort: PropTypes.func.isRequired,
};

export default FiltersAndButton;
