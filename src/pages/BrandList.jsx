import { Table } from "antd";

import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import CustomModal from "../components/CustomModal";

import { Link } from "react-router-dom";
// Icons
import { RiEdit2Line } from "react-icons/ri";
import { toast } from "react-toastify";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteABrand, getAllBrands } from "../features/brand/brandSlice";

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

const BrandList = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  const brandState = useSelector((state) => state.brand.brands);

  const data = brandState.map((brand, index) => ({
    key: index + 1,
    name: brand.title,
    action: (
      <div className="d-flex">
        <EditButton to={`/dashboard/brand/${brand._id}`} />
        <DeleteButton onClick={() => showModal(brand._id)} />
      </div>
    ),
  }));

  // Delete A Brand
  const showModal = (id) => {
    setOpen(true);
    setBrandId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const deleteBrand = async (id) => {
    try {
      dispatch(deleteABrand(id));
      toast.success("Brand deleted successfully!");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to delete brand.");
    }
    setTimeout(() => {
      dispatch(getAllBrands());
    }, 100);
  };

  return (
    <div>
      {/* Page Title & Add Button */}
      <div className="d-flex justify-content-between align-items-center my-2 mb-3">
        <h3 className="page-title">Brand List</h3>

        <Link
          to={"/dashboard/brand"}
          className="button rounded-1 d-flex gap-1"
          style={{ padding: "10px" }}
        >
          <RiEdit2Line fontSize={20} />
          <span>Add Brand</span>
        </Link>
      </div>
      {/* Page Title & Add Button End*/}

      {/* Table */}
      <div className="table-container">
        <Table columns={columns} dataSource={data} />
      </div>
      {/* Table End*/}

      {/* Delete Funcationality */}
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => deleteBrand(brandId)}
        title="Are you sure you want to delete this Brand?"
      />
    </div>
  );
};

export default BrandList;
