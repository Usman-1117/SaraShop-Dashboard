import { Empty, Table } from "antd";
import { Link } from "react-router-dom";

import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";

import { RiEdit2Line } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCoupons } from "../features/coupon/couponSlice";

const columns = [
  {
    title: "Sr No.",
    dataIndex: "key",
    sorter: (a, b) => a.key - b.key,
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Discount",
    dataIndex: "discount",
    sorter: (a, b) => parseFloat(a.discount) - parseFloat(b.discount),
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
    sorter: (a, b) => new Date(a.expiry) - new Date(b.expiry),
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Couponlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCoupons());
  }, [dispatch]);

  const couponState = useSelector((state) => state.coupon.coupons);

  const data = couponState.map((coupon, i) => ({
    key: i + 1,
    name: coupon.name,
    discount: `${coupon.discount}%`,
    expiry: new Date(coupon.expiry).toLocaleString(),
    action: (
      <>
        <EditButton to="/" />
        <DeleteButton to="/" />
      </>
    ),
  }));
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-2 mb-3">
        <h3 className="page-title">Coupon List</h3>

        {/* Add Coupon */}
        <Link
          to={"/dashboard/coupon"}
          className="button rounded-1 d-flex gap-1"
          style={{ padding: "10px" }}
        >
          <RiEdit2Line fontSize={20} />
          <span>Add Coupon</span>
        </Link>
        {/* Add Coupon End */}
      </div>
      {couponState.length > 0 ? (
        <div className="table-container">
          <Table columns={columns} dataSource={data} />
        </div>
      ) : (
        <Empty description="No data available" />
      )}
    </div>
  );
};

export default Couponlist;
