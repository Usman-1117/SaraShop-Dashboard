import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";

const columns = [
  {
    title: "Sr No.",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Role",
    dataIndex: "role",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
];

const Customers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const customerState = useSelector((state) => state.customer.customers);

  const data = customerState.map((customer, index) => ({
    key: index + 1,
    name: `${customer.firstname} ${customer.lastname}`,
    email: customer.email,
    mobile: customer.mobile,
    role: customer.role,
  }));

  return (
    <div>
      <h3 className="page-title mb-4">Customers</h3>

      {customerState.length > 0 ? (
        <div className="table-container">
          <Table columns={columns} dataSource={data} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Customers;
