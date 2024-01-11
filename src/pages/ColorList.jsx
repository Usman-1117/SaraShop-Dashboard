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
const ColorList = () => {
  return (
    <div>
      <h3 className="page-title mb-4">Color List</h3>
      <div className="table-container">
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ColorList;
