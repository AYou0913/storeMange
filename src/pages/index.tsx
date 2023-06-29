import { useState } from "react";
import { Table, Tabs, Typography, Space, Descriptions } from "antd";

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
      <Descriptions title="收入汇总(截止06.29)">
        <Descriptions.Item label="微信&支付宝&龙卡">
          164856.64
        </Descriptions.Item>
        <Descriptions.Item label="美团">16341.86</Descriptions.Item>
        <Descriptions.Item label="饿了吗">2986</Descriptions.Item>
        <Descriptions.Item label="总计收入" span={3}>
          164856.64 + 16341.86 + 2986 = 184184.50
        </Descriptions.Item>
      </Descriptions>

      <Descriptions title="支出汇总(截止06.29)">
        <Descriptions.Item label="开业前支出">290449.00</Descriptions.Item>
        <Descriptions.Item label="开业后日常">176005.91</Descriptions.Item>
        <Descriptions.Item label="分红一次">4010</Descriptions.Item>
        <Descriptions.Item label="总支出" span={3}>
          290449.00 + 176005.91 + 4010 = 470464.41
        </Descriptions.Item>
      </Descriptions>

      <div>
        {/* <div>支出部分：包含开业前支出+开业后支出</div>
        <div>截止0626总支出（仅包含微信）：466454.41</div>
        <div>其中开业前总支出：290449.00</div>
        <div>其中开业后总支出：176005.91</div>
        <div>分红一次,共计：4010</div>

        <div>收入部分包含：微信+支付宝+银行卡+美团+饿了吗</div>
        <div>截止0626总收入:184184.50</div>
        <div>截止0626总收入（仅包含微信、支付宝、银行卡）：164856.64</div>

        <div> 饿了么截止0624总计收入：2986</div>
        <div> 美团截止0624总计收入：16341.86</div> */}

        <div>有记录的现金总支出：5527，预估现金收入约15000</div>
        <div> 现有现金剩余(截止06.29):1172（店铺）+ 1500（积累）</div>

        <div>
          总计收入约(不包含现金)：300000 + 184184.50 - 470464.41 = 13720.09
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
