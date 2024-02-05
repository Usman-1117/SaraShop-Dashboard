import { Empty, Table } from "antd";
// Icons
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";

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
    sorter: (a, b) => a.name.localeCompare(b.name),
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
        <EditButton to={`/dashboard/brand/${brand._id}`} />

        <DeleteButton to="/" />
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
