import React, { useState } from "react";
import { Select, Button } from "antd";

import styles from "./index.module.css";

interface IProps {
  onSearch: (data: string) => void;
}

const Income = (props: IProps) => {
  const { onSearch } = props;

  const [timeRange, setTimeRange] = useState<string>("23Y06M");

  const handleSelectChange = (value) => {
    setTimeRange(value);
  };

  const handleClick = () => {
    if (timeRange && typeof onSearch === "function") {
      onSearch(timeRange);
    }
  };

  return (
    <div className={styles.searchBar}>
      <Select
        style={{ width: 200 }}
        defaultValue={timeRange}
        onChange={handleSelectChange}
      >
        <Select.Option value="history">开业前</Select.Option>
        <Select.Option value="22Y12M">十二月</Select.Option>
        <Select.Option value="23Y01M">一月</Select.Option>
        <Select.Option value="23Y02M">二月</Select.Option>
        <Select.Option value="23Y03M">三月</Select.Option>
        <Select.Option value="23Y04M">四月</Select.Option>
        <Select.Option value="23Y05M">五月</Select.Option>
        <Select.Option value="23Y06M">六月</Select.Option>
      </Select>

      <Button type="primary" onClick={handleClick}>
        查询
      </Button>
    </div>
  );
};

export default Income;
