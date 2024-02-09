import { Empty, Table } from "antd";

import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";

import { Link } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../features/blogs/blogSlice";

const columns = [
  {
    title: "Sr No.",
    dataIndex: "key",
    sorter: (a, b) => a.key - b.key,
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.name.localeCompare(b.name),
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
        <EditButton />
        <DeleteButton />
      </>
    ),
  }));

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h3 className="page-title">Blogs List</h3>
        <Link to="/dashboard/blog" className="button">
          Add Blog
        </Link>
      </div>
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
