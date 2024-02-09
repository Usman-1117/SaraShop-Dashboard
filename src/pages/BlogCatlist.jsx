import { Empty, Table } from "antd";

import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";
import CustomModal from "../components/CustomModal";

import { RiEdit2Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  deleteABlogCategory,
} from "../features/blogCategory/blogCategorySlice";

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
    title: "Action",
    dataIndex: "action",
  },
];

const BlogCatList = () => {
  const [open, setOpen] = useState(false);
  const [bloCatId, setBlogCatId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const blogCategoryState = useSelector(
    (state) => state.blogCategory.blogCategories
  );

  const data = blogCategoryState.map((blogCategory, i) => ({
    key: i + 1,
    name: blogCategory.title,
    action: (
      <>
        <EditButton to={`/dashboard/blog-category/${blogCategory._id}`} />
        <DeleteButton onClick={() => showModal(blogCategory._id)} />
      </>
    ),
  }));

  // Delete A Category
  const showModal = (id) => {
    setOpen(true);
    setBlogCatId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const deleteCategory = async (id) => {
    try {
      dispatch(deleteABlogCategory(id));
      toast.success("Category deleted successfully!");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to delete Category.");
    }
    setTimeout(() => {
      dispatch(getAllCategories());
    }, 100);
  };

  return (
    <>
      {/* Page Title & Add Button */}
      <div className="d-flex justify-content-between align-items-center my-2 mb-3">
        <h3 className="page-title">Blog Category List</h3>

        <Link
          to={"/dashboard/blog-category"}
          className="button rounded-1 d-flex gap-1"
          style={{ padding: "10px" }}
        >
          <RiEdit2Line fontSize={20} />
          <span>Add Category</span>
        </Link>
      </div>
      {/* Page Title & Add Button End*/}

      {/* Table */}
      {blogCategoryState.length > 0 ? (
        <div className="table-container">
          <Table columns={columns} dataSource={data} />
        </div>
      ) : (
        <Empty description="No data available" />
      )}
      {/* Table End */}

      {/* Delete Modal */}
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => deleteCategory(bloCatId)}
        title="Are you sure you want to delete category?"
      />
    </>
  );
};

export default BlogCatList;
