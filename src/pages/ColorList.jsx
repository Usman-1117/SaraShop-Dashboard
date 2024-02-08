import { Empty, Table } from "antd";

import CustomModal from "../components/CustomModal";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";

import { RiEdit2Line } from "react-icons/ri";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAColor, getAllColors } from "../features/color/colorSlice";

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

const ColorList = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllColors());
  }, [dispatch]);

  const colorState = useSelector((state) => state.color.colors);

  const data = colorState.map((color, i) => ({
    key: i + 1,
    name: color.title,
    action: (
      <>
        <EditButton />
        <DeleteButton onClick={() => showModal(color._id)} />
      </>
    ),
  }));

  // Delete A Category
  const showModal = (id) => {
    setOpen(true);
    setColorId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const deleteCategory = async (id) => {
    try {
      dispatch(deleteAColor(id));
      toast.success("Color deleted successfully!");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to delete a Color.");
    }
    setTimeout(() => {
      dispatch(getAllColors());
    }, 100);
  };

  return (
    <div>
      {/* Page Title & Add Button */}
      <div className="d-flex justify-content-between align-items-center my-2 mb-3">
        <h3 className="page-title">Color List</h3>

        <Link
          to={"/dashboard/color"}
          className="button rounded-1 d-flex gap-1"
          style={{ padding: "10px" }}
        >
          <RiEdit2Line fontSize={20} />
          <span>Add Colors</span>
        </Link>
      </div>
      {/* Page Title & Add Button End*/}

      {/* Table */}
      {colorState.length > 0 ? (
        <div className="table-container">
          <Table columns={columns} dataSource={data} />
        </div>
      ) : (
        <Empty description="No data available" />
      )}
      {/* Table End*/}

      {/* Delete Modal */}
      <CustomModal
        open={open}
        hideModal={hideModal}
        performAction={() => deleteCategory(colorId)}
        title="Are you sure you want to delete this Color?"
      />
    </div>
  );
};

export default ColorList;
