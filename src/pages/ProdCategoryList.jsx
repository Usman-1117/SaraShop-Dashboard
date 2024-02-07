import { Empty, Table } from "antd";

import { RiEdit2Line } from "react-icons/ri";

import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import CustomModal from "../components/CustomModal";

import { toast } from "react-toastify";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteACategory,
  getAllCategories,
} from "../features/prodCategory/prodCategorySlice";
// Imports End

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

const ProdCategoryList = () => {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const prodCategoryState = useSelector(
    (state) => state.prodCategory.prodCategories
  );

  const data = prodCategoryState.map((category, i) => ({
    key: i + 1,
    name: category.title,

    action: (
      <>
        <EditButton to={`/dashboard/category/${category._id}`} />
        <DeleteButton onClick={() => showModal(category._id)} />
      </>
    ),
  }));

  // Delete A Category
  const showModal = (id) => {
    setOpen(true);
    setCategoryId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const deleteCategory = async (id) => {
    try {
      dispatch(deleteACategory(id));
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
    <div>
      {/* Page Title & Add Button */}
      <div className="d-flex justify-content-between align-items-center my-2 mb-3">
        <h3 className="page-title">Product Category List</h3>

        <Link
          to={"/dashboard/category"}
          className="button rounded-1 d-flex gap-1"
          style={{ padding: "10px" }}
        >
          <RiEdit2Line fontSize={20} />
          <span>Add Category</span>
        </Link>
      </div>
      {/* Page Title & Add Button End*/}

      {/* Table */}
      {prodCategoryState.length > 0 ? (
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
        performAction={() => deleteCategory(categoryId)}
        title="Are you sure you want to delete this category?"
      />
    </div>
  );
};

export default ProdCategoryList;
