import { Empty, Table } from "antd";

// Icons

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getOrders } from "../features/auth/authSlice";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";
import { Link } from "react-router-dom";

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
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orderState = useSelector((state) => state.auth.orders);

  const data = orderState.map((order, i) => ({
    key: i + 1,
    name: "",
    amount: order.paymentIntent.amount,
    status: order.orderStatus,
    date: new Date(order.createdAt).toLocaleString(),
    product: <Link to={`/dashboard/order/${order._id}`}>View Order</Link>,

    action: (
      <>
        <EditButton />
        <DeleteButton />
      </>
    ),
  }));

  return (
    <>
      {/* Page Title */}
      <h3 className="page-title mb-4">Orders</h3>

      {/* Table */}
      {orderState.length > 0 ? (
        <div className="table-container">
          <Table columns={columns} dataSource={data} />
        </div>
      ) : (
        <Empty description="No data available" />
      )}
      {/* Table End*/}
    </>
  );
};

export default Orders;
