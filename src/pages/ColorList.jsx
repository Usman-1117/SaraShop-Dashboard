import { Empty, Table } from "antd";
import { Link } from "react-router-dom";
// Icons
import { FaRegEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getColors } from "../features/color/colorSlice";

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

const ColorList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);

  const colorState = useSelector((state) => state.color.colors);

  const data = colorState.map((color, index) => ({
    key: index + 1,
    name: color.title,
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
      <h3 className="page-title mb-4">Color List</h3>
      {colorState.length > 0 ? (
        <div className="table-container">
          <Table columns={columns} dataSource={data} />
        </div>
      ) : (
        <Empty description="No data available" />
      )}
    </div>
  );
};

export default ColorList;
