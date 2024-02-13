import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderByUser } from "../features/auth/authSlice";
import { useLocation } from "react-router-dom";

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
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ViewOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userId = location.pathname.split("/")[3];

  useEffect(() => {
    dispatch(getOrderByUser(userId));
  }, [dispatch, userId]);

  const orderState = useSelector((state) => state.auth.orderbyuser);
  console.log(orderState);

  const data = [];
  for (let i = 0; i < orderState.length; i++) {
    data.push({
      key: i + 1,
    });
  }

  return (
    <>
      {/* Page Title */}
      <h3 className="page-title mb-4">View Orders</h3>

      {/* Table */}
      <div className="table-container">
        <Table columns={columns} dataSource={data} />
      </div>
      {/* Table End*/}
    </>
  );
};

export default ViewOrder;
