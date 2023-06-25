import { useState } from "react";
import { Table, Tabs, Typography, Space } from "antd";

import styles from "./index.module.css";

const { Text, Link } = Typography;

export default function Home() {
  const incomeTotalList = [
    13719.0, 17182, 23347.5, 32545, 27872.06, 23984.84, 22290.57,
  ];
  const totalIncome = incomeTotalList.reduce((t, i) => (t += i), 0);
  console.log("totalIncome", totalIncome);

  const expendTotalList = [
    13177.0, 27019.0, 16708.0, 40554.0, 32179.02, 20006.5, 25107.5,
  ];
  const totalExpend = expendTotalList.reduce((t, i) => (t += i), 0);
  console.log("totalExpend", totalExpend);

  return (
    <div className={styles.app}>
      <div>
        <div>开业前总支出：290449.00</div>
        <div>截止0624总收入（仅包含微信、支付宝、银行卡）：{totalIncome}</div>
        <div>截止0624总支出（仅包含微信）：{totalExpend}</div>

        <div> 饿了么截止0624总计收入：2986</div>
        <div> 美团截止0624总计收入：16341.86</div>
        <div>有记录的现金总支出：5527，预估现金收入约15000</div>

        <div>
          总计收入约(包含现金)：
          {totalIncome}+2986+16341.86-{totalExpend} =
          {totalIncome + 2986 + 16341.86 - totalExpend}
        </div>

        <Space>
          <Link href="/income">收入详情</Link>
          <Link href="/expend">支出详情</Link>
          <Link href="/recordAcount">数据录入</Link>
        </Space>
      </div>
    </div>
  );
}
