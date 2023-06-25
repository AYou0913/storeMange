import React, { useEffect, useState } from "react";
import { Table } from "antd";

import SearchBar from "./SearchBar";

import styles from "./index.module.css";

const SEARCH_URL = "http://127.0.0.1:3000/openapi";

const TypeMap = {
  cash: "现金",
  weChat: "微信",
};

const Expend = () => {
  const [accountData, setAccountData] = useState<any[]>([]);
  const [finallyData, setFinallyData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${SEARCH_URL}/history/expendAll`)
      .then((res) => res.json())
      .then((res) => {
        if (!Array.isArray(res)) {
          return;
        }

        const formattedData = res.map((item) => {
          const totalData = getDayTotal(item?.expendList);

          return { ...item, ...totalData };
        });

        setAccountData(formattedData);
        setFinallyData(formattedData);
      });
  }, []);

  const getDayTotal = (dayData) => {
    let weChatExpend = 0;
    let cashExpend = 0;

    if (Array.isArray(dayData)) {
      dayData.forEach((item) => {
        if (item?.type === "weChat") {
          weChatExpend += Number(item?.value);
        } else if (item?.type === "cash") {
          cashExpend += Number(item?.value);
        }
      });
    }

    return {
      weChatExpend,
      cashExpend,
      dayExpend: weChatExpend + cashExpend,
    };
  };

  const handleSearch = (searchKey) => {
    if (!searchKey) {
      setFinallyData(accountData);
      return;
    }

    const newData: any[] = [];
    accountData.forEach((item) => {
      const { date, expendList } = item;

      if (!Array.isArray(expendList) || !expendList.length) {
        return;
      }

      const newExpendList = expendList.filter((ele) => {
        const matchTitle = ele?.title.includes(searchKey);
        const matchDesc = ele?.desc.includes(searchKey);
        const matchValue = String(ele?.value) === searchKey;
        return matchTitle || matchDesc || matchValue;
      });

      if (Array.isArray(newExpendList) && newExpendList.length) {
        newData.push({ date, expendList: newExpendList });
      }
    });
    setFinallyData(newData);
  };

  const typeFilters = Object.keys(TypeMap).map((item) => ({
    value: item,
    text: TypeMap[item],
  }));

  const expandedRowRender = (record) => {
    const columns = [
      {
        title: "支出项",
        dataIndex: "title",
      },
      {
        title: "金额",
        dataIndex: "value",
      },
      {
        title: "支出类型",
        dataIndex: "type",
        filters: typeFilters,
        onFilter: (value: string, r) => r.type.indexOf(value) === 0,
        render: (type) => TypeMap?.[type] || type,
      },
      {
        title: "备注",
        dataIndex: "desc",
      },
    ];

    return (
      <Table
        rowKey={(record, index) => `${record.date}_${index}`}
        columns={columns}
        dataSource={record?.expendList}
        pagination={false}
      />
    );
  };

  const SummaryNode = (pageData) => {
    let totalWX = 0;
    let totalCash = 0;
    let totalAll = 0;

    pageData.forEach((item) => {
      const { weChatExpend = 0, cashExpend = 0, dayExpend = 0 } = item || {};

      totalWX += +weChatExpend;
      totalCash += +cashExpend;
      totalAll += +dayExpend;
    });

    return (
      <>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0}></Table.Summary.Cell>
          <Table.Summary.Cell index={1}>合计</Table.Summary.Cell>
          <Table.Summary.Cell index={2}>
            {totalWX.toFixed(2)}
          </Table.Summary.Cell>
          <Table.Summary.Cell index={3}>
            {totalCash.toFixed(2)}
          </Table.Summary.Cell>
          <Table.Summary.Cell index={5}>
            {totalAll.toFixed(2)}
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </>
    );
  };

  const expendColumns = [
    {
      title: "日期",
      dataIndex: "date",
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: "微信支出",
      dataIndex: "weChatExpend",
    },
    {
      title: "现金支出",
      dataIndex: "cashExpend",
    },
    {
      title: "总支出",
      dataIndex: "dayExpend",
    },
  ];

  // console.log("accountData", accountData,finallyData);

  return (
    <div className={styles.app}>
      <SearchBar onSearch={handleSearch} />

      <Table
        rowKey="date"
        columns={expendColumns}
        dataSource={finallyData}
        expandable={{ expandedRowRender }}
        summary={SummaryNode}
        pagination={false}
      />
    </div>
  );
};

export default Expend;
