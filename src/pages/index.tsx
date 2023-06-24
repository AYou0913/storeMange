import { useState } from "react";
import { Table, Tabs, Typography, Space } from "antd";

import styles from "./index.module.css";

const { Text, Link } = Typography;

export default function Home() {
  const [count, setCount] = useState(1);
  const updateCount = () => setCount((c) => c + 1);

  return (
    <div className={styles.app}>
      {/* <header>
        <img src={logo} alt="logo" />
        <p>Hello ice.js 3</p>
      </header> */}

      <div>
        <Space>
          <Link href="/income">收入详情</Link>
          <Link href="/expend">支出详情</Link>
          <Link href="/recordAcount">数据录入</Link>
        </Space>
      </div>
    </div>
  );
}
