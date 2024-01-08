import "./Dashboard.scss";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { Column } from "@ant-design/plots";
import { Table } from "antd";

const columns = [
  {
    title: "Sr No.",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "address",
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const Dashboard = () => {
  const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Feb",
      sales: 52,
    },
    {
      type: "March",
      sales: 61,
    },
    {
      type: "April",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "June",
      sales: 38,
    },
    {
      type: "July",
      sales: 38,
    },
    {
      type: "Aug",
      sales: 38,
    },
    {
      type: "Sep",
      sales: 38,
    },
    {
      type: "Oct",
      sales: 38,
    },
    {
      type: "Nov",
      sales: 38,
    },
    {
      type: "Dec",
      sales: 38,
    },
  ];

  const config = {
    data,
    xField: "type",
    yField: "sales",

    label: {
      position: "bottom", // or "top"
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  return (
    <div className="dashboard-container">
      <h3 className="page-title mb-4">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        {/* 1 */}
        <div className="d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p>Total</p>
            <h4>$100.00</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <FaArrowTrendUp /> 36%
            </h6>
            <p>Compared To March 2023</p>
          </div>
        </div>

        {/* 2 */}
        <div className="d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p>Total</p>
            <h4>$100.00</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <FaArrowTrendDown /> 36%
            </h6>
            <p>Compared To March 2023</p>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p>Total</p>
            <h4>$100.00</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>
              <FaArrowTrendUp /> 36%
            </h6>
            <p>Compared To March 2023</p>
          </div>
        </div>
        {/* 3 */}
      </div>

      {/* Incom Statics */}
      <div className="mt-4">
        <h3 className="mb-4">Incom Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-4">
        <h3>Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
