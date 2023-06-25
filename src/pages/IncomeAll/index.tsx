import React, { useEffect, useState } from "react";
import { Table } from "antd";

import styles from "./index.module.css";

const SEARCH_URL = "http://127.0.0.1:3000/openapi";

const Income = () => {
  const [accountData, setAccountData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${SEARCH_URL}/history/incomeAll`)
      .then((res) => res.json())
      .then((res) => {
        if (Array.isArray(res)) {
          setAccountData(res);
        }
      });
  }, []);

  const SummaryNode = (pageData) => {
    let totalWX = 0;
    let totalZFB = 0;
    let totalCARD = 0;
    let totalOther = 0;
    let totalIncome = 0;

    pageData.forEach((item) => {
      const { weChat = 0, aliPay = 0, card = 0, other = 0 } = item || {};
      const incomeTotal =
        Number(weChat) + Number(aliPay) + Number(card) + Number(other);
      totalWX += +weChat;
      totalZFB += +aliPay;
      totalCARD += +card;
      totalOther += +other;
      totalIncome += +incomeTotal;
    });

    return (
      <>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0}>总计</Table.Summary.Cell>
          <Table.Summary.Cell index={1}>
            {totalWX.toFixed(2)}
          </Table.Summary.Cell>
          <Table.Summary.Cell index={2}>
            {totalZFB.toFixed(2)}
          </Table.Summary.Cell>
          <Table.Summary.Cell index={3}>
            {totalCARD.toFixed(2)}
          </Table.Summary.Cell>
          <Table.Summary.Cell index={3}>
            {totalOther.toFixed(2)}
          </Table.Summary.Cell>

          <Table.Summary.Cell index={4}>
            {totalIncome.toFixed(2)}
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </>
    );
  };

  const incomeColumns = [
    {
      title: "日期",
      dataIndex: "date",
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: "微信",
      dataIndex: "weChat",
    },
    {
      title: "支付宝",
      dataIndex: "aliPay",
    },
    {
      title: "建行卡",
      dataIndex: "card",
    },
    {
      title: "其他",
      dataIndex: "other",
    },
    {
      title: "总计",
      key: "dayIncome",
      render: (_, record) => {
        const { weChat = 0, aliPay = 0, card = 0, other = 0 } = record || {};
        const dayIncome = weChat + aliPay + card + other;

        return dayIncome.toFixed(2);
      },
    },
  ];

  const newTotal = accountData.map((item) => {
    const { weChat = 0, aliPay = 0, card = 0, other = 0 } = item || {};
    const dayIncome = weChat + aliPay + card + other;
    return { ...item, dayIncome };
  });

  console.log("newTotal", newTotal, JSON.stringify(newTotal));

  return (
    <div className={styles.app}>
      <Table
        rowKey="date"
        columns={incomeColumns}
        dataSource={accountData}
        summary={SummaryNode}
        pagination={false}
      />
    </div>
  );
};

export default Income;
