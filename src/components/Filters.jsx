import React from "react";
import { Button, Space, Typography } from "antd";
import PropTypes from "prop-types";

import styles from "../index.module.css";
import { sortByBody, sortByTime, sortByTitle } from "../utils/sortUtils";

const { Title } = Typography;

const Filters = ({ handleSort }) => {
  return (
    <Space direction="vertical" className={styles.block}>
      <Title>Filters:</Title>
      <Space.Compact size="large" block>
        <Button type="primary" onClick={() => handleSort(sortByTitle)}>
          Name
        </Button>
        <Button type="primary" onClick={() => handleSort(sortByBody)}>
          Description
        </Button>
        <Button type="primary" onClick={() => handleSort(sortByTime)}>
          Time
        </Button>
      </Space.Compact>
    </Space>
  );
};

Filters.propTypes = {
  handleSort: PropTypes.func.isRequired,
};

export default Filters;
