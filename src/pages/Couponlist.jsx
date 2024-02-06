import { Empty, Table } from "antd";
import { Link } from "react-router-dom";

import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";

import { RiEdit2Line } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteACoupon, getAllCoupons } from "../features/coupon/couponSlice";
import CustomModal from "../components/CustomModal";

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
  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState("");

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
        <EditButton to={`/dashboard/coupon/${coupon._id}`} />
        <DeleteButton onClick={() => showModal(coupon._id)} />
      </>
    ),
  }));

  // Delete A Coupon
  const showModal = (e) => {
    setOpen(true);
    setCouponId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const deleteCoupon = (e) => {
    dispatch(deleteACoupon(e));
    dispatch(getAllCoupons());
    setOpen(false);
  };
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-2 mb-3">
        <h3 className="page-title">Coupon List</h3>

        {/* Add Coupon Button */}
        <Link
          to={"/dashboard/coupon"}
          className="button rounded-1 d-flex gap-1"
          style={{ padding: "10px" }}
        >
          <RiEdit2Line fontSize={20} />
          <span>Add Coupon</span>
        </Link>
        {/* Add Coupon End Button */}
      </div>

      {couponState.length > 0 ? (
        <div className="table-container">
          <Table columns={columns} dataSource={data} />
        </div>
      ) : (
        <Empty description="No data available" />
      )}

      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => deleteCoupon(couponId)}
        title="Are you sure you want to delete this Coupon?"
      />
    </div>
  );
};

export default Couponlist;
