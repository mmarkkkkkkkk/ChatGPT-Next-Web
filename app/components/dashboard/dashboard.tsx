import { FC } from "react";
import {
  ConfigProvider,
  Space,
  Table,
  TableProps,
  Tabs,
  Tag,
  theme,
} from "antd";
import { useNavigate } from "react-router-dom";

import { useAccessStore } from "@/app/store";
import { Path } from "@/app/constant";
import styles from "./dashboard.module.scss";
import { useDarkMode } from "@/app/utils/hooks";

const { TabPane } = Tabs;

interface DashboardProps {}

const columns: TableProps<any>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag: any) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: any[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const Dashboard: FC<DashboardProps> = (props) => {
  const { accessCode } = useAccessStore();
  const navigate = useNavigate();
  const isDark = useDarkMode();

  if (!accessCode) {
    navigate(Path.Auth);
    return null;
  }

  // const usageRecordsResp = await fetchLyyBackend(LyyApi.usageRecords, {})

  return (
    <div className={styles["dashboard"]}>
      <ConfigProvider theme={isDark ? { algorithm: theme.darkAlgorithm } : {}}>
        <Tabs>
          <TabPane tab="使用记录" key="usage">
            <Table columns={columns} dataSource={data} />
          </TabPane>
          <TabPane tab="充值记录" key="pay">
            charge
          </TabPane>
        </Tabs>
      </ConfigProvider>
    </div>
  );
};

export default Dashboard;
