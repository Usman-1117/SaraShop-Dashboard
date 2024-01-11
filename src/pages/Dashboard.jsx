import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
// import { FaRegEdit, FaTrash } from "react-icons/fa";

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

const recentOrdersData = [];
for (let i = 0; i < 46; i++) {
  recentOrdersData.push({
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

      {/* Comparison */}
      <h3 className="sub-heading mb-2">Incom Statics</h3>
      <div className="comparison-card d-flex flex-wrap justify-content-between align-items-center gap-3">
        {/* 1 */}
        <div className="d-flex justify-content-between align-items-center flex-grow-1 bg-white rounded-3 p-3 p-lg-4">
          <div className="total-earning d-flex flex-column gap-1">
            <p>Total</p>
            <h4>$100.00</h4>
          </div>

          <div className="compar-data d-flex flex-column align-items-end gap-2">
            <h6 className="green">
              <FaArrowTrendUp /> 36%
            </h6>
            <p>Compared To March 2023</p>
          </div>
        </div>

        {/* 2 */}
        <div className="d-flex justify-content-between align-items-center flex-grow-1 bg-white rounded-3 p-3 p-lg-4">
          <div className="total-earning d-flex flex-column gap-1">
            <p>Total</p>
            <h4>$100.00</h4>
          </div>

          <div className="compar-data d-flex flex-column align-items-end gap-2">
            <h6 className="red">
              <FaArrowTrendDown /> 36%
            </h6>
            <p>Compared To March 2023</p>
          </div>
        </div>

        {/* 3 */}
        <div className="d-flex justify-content-between align-items-center flex-grow-1 bg-white rounded-3 p-3 p-lg-4">
          <div className="total-earning d-flex flex-column gap-1">
            <p>Total</p>
            <h4>$100.00</h4>
          </div>

          <div className="compar-data d-flex flex-column align-items-end gap-2">
            <h6 className="green">
              <FaArrowTrendUp /> 36%
            </h6>
            <p>Compared To March 2023</p>
          </div>
        </div>
      </div>

      {/* Incom Statics */}
      <div className="mt-4">
        <h3 className="sub-heading mb-3">Monthly Sales</h3>
        <div className="monthly-sales-cart">
          <Column {...config} />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-4">
        <h3 className="sub-heading mb-3">Recent Orders</h3>
        <div className="table-container">
          <Table columns={columns} dataSource={recentOrdersData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
