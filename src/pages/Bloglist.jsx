import { Empty, Table } from "antd";

import { Link } from "react-router-dom";
// Icons
import { FaRegEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getBlogs } from "../features/blogs/blogSlice";

const columns = [
  {
    title: "Sr No.",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.localeCompare(b.category),
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Bloglist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  const blogState = useSelector((state) => state.blog.blogs);

  const data = blogState.map((blog, index) => ({
    key: index + 1,
    title: blog.title,
    category: blog.category,
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
      <h3 className="page-title mb-4">Blogs List</h3>
      {blogState.length > 0 ? (
        <div className="table-container">
          <Table columns={columns} dataSource={data} />
        </div>
      ) : (
        <Empty description="No data available" />
      )}
    </div>
  );
};

export default Bloglist;
