import { Empty, Table } from "antd";

import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import CustomModal from "../components/CustomModal";

import { RiEdit2Line } from "react-icons/ri";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, deleteABlog } from "../features/blogs/blogSlice";

const columns = [
  {
    title: "Sr No.",
    dataIndex: "key",
    sorter: (a, b) => a.key - b.key,
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

const BlogList = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  const blogState = useSelector((state) => state.blog.blogs);

  const data = blogState.map((blog, i) => ({
    key: i + 1,
    title: blog.title,
    category: blog.category,
    action: (
      <>
        <EditButton to={`/dashboard/blog/${blog._id}`} />
        <DeleteButton onClick={() => showModal(blog._id)} />
      </>
    ),
  }));

  // Delete A Category
  const showModal = (id) => {
    setOpen(true);
    setBlogId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const deleteBlog = async (id) => {
    try {
      dispatch(deleteABlog(id));
      toast.success("Blog deleted successfully!");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to delete a Blog.");
    }
    setTimeout(() => {
      dispatch(getAllBlogs());
    }, 100);
  };
  return (
    <>
      {/* Page Title & Add Button */}
      <div className="d-flex justify-content-between align-items-center my-2 mb-3">
        <h3 className="page-title">Blog List</h3>

        <Link
          to={"/dashboard/blog"}
          className="button rounded-1 d-flex gap-1"
          style={{ padding: "10px" }}
        >
          <RiEdit2Line fontSize={20} />
          <span>Add Blog</span>
        </Link>
      </div>
      {/* Page Title & Add Button End*/}

      {/* Table */}
      {blogState.length > 0 ? (
        <div className="table-container">
          <Table columns={columns} dataSource={data} />
        </div>
      ) : (
        <Empty description="No data available" />
      )}
      {/* Table End*/}

      {/* Delete Modal */}
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => deleteBlog(blogId)}
        title="Are you sure you want to delete this Blog?"
      />
    </>
  );
};

export default BlogList;
