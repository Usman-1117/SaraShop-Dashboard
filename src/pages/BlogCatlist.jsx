import { Empty, Table } from "antd";

import { Link } from "react-router-dom";
// Icons
import { FaRegEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getCategories } from "../features/blogCategory/blogCategorySlice";

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

const BlogCatlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const blogCategoryState = useSelector(
    (state) => state.blogCategory.blogCategories
  );

  const data = blogCategoryState.map((color, index) => ({
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
      <h3 className="page-title mb-4">Blog Category List</h3>
      {blogCategoryState.length > 0 ? (
        <div className="table-container">
          <Table columns={columns} dataSource={data} />
        </div>
      ) : (
        <Empty description="No data available" />
      )}
    </div>
  );
};

export default BlogCatlist;
