import { Empty, Table } from "antd";
import { Link } from "react-router-dom";
// Icons
import { FaRegEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBrands } from "../features/brand/brandSlice";

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
    title: "Action",
    dataIndex: "action",
  },
];

const BrandList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const brandState = useSelector((state) => state.brand.brands);

  const data = brandState.map((brand, index) => ({
    key: index + 1,
    name: brand.title,
    action: (
      <>
        <Link to="/" className="fs-5 text-primary">
          <FaRegEdit />
        </Link>

        <Link to="/" className="ms-4 fs-5 " style={{ color: "#CC0000" }}>
          <FaTrashCan />
        </Link>
      </>
    ),
  }));
  return (
    <div>
      <h3 className="page-title mb-4">Brand List</h3>
      {brandState.length > 0 ? (
        <div className="table-container">
          <Table columns={columns} dataSource={data} />
        </div>
      ) : (
        <Empty description="No data available" />
      )}
    </div>
  );
};

export default BrandList;
