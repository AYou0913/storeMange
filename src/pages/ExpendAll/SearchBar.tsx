import React, { useState } from "react";
import { Input, Button } from "antd";

import styles from "./index.module.css";

interface IProps {
  onSearch: (data: string) => void;
}

const Income = (props: IProps) => {
  const { onSearch } = props;

  const [searchKey, setSearchKey] = useState<string>("");

  const handleInputChange = (evt) => {
    setSearchKey(evt.target.value);
  };

  const handleClick = () => {
    if (searchKey && typeof onSearch === "function") {
      onSearch(searchKey);
    }
  };

  return (
    <div className={styles.searchBar}>
      <Input onChange={handleInputChange} />

      <Button type="primary" onClick={handleClick}>
        查询
      </Button>
    </div>
  );
};

export default Income;
