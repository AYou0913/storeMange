import React, { useEffect, useState } from "react";
import { Table, Checkbox } from "antd";

import styles from "./index.module.css";

const Expend = () => {
  const [accountData, setAccountData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/openapi/debt")
      .then((res) => res.json())
      .then((res) => {
        if (!Array.isArray(res)) {
          return;
        }

        setAccountData(res);
      });
  }, []);

  const expandedRowRender = (record) => {
    const columns = [
      {
        title: "日期",
        dataIndex: "date",
      },
      {
        title: "金额",
        dataIndex: "value",
      },

      {
        title: "备注",
        dataIndex: "desc",
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={record?.debtList}
        pagination={false}
      />
    );
  };

  const SummaryNode = (pageData) => {
    let totalAll = 0;

    pageData.forEach((item) => {
      const { total = 0 } = item || {};

      totalAll += +total;
    });

    return (
      <>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0}></Table.Summary.Cell>
          <Table.Summary.Cell index={1}>合计</Table.Summary.Cell>
          <Table.Summary.Cell index={2} colSpan={3}>
            {totalAll.toFixed(2)}
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </>
    );
  };

  const expendColumns = [
    {
      title: "店铺",
      dataIndex: "title",
    },
    {
      title: "总计",
      dataIndex: "total",
    },
    {
      title: "描述",
      dataIndex: "desc",
    },
    {
      title: "核对",
      dataIndex: "isChecked",
      render: (isChecked) => (
        <Checkbox checked={isChecked}>已发出明细</Checkbox>
      ),
    },
  ];

  return (
    <div className={styles.app}>
      <Table
        rowKey="title"
        columns={expendColumns}
        dataSource={accountData}
        expandable={{ expandedRowRender }}
        summary={SummaryNode}
        pagination={false}
      />
    </div>
  );
};

export default Expend;
