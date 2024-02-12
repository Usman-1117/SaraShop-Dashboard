import CustomModal from "../components/CustomModal";
import DeleteButton from "../components/DeleteButton";

import { Empty, Select, Table } from "antd";

import { AiOutlineEye } from "react-icons/ai";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAEnquiry,
  getEnquiries,
  updateAEnquiry,
} from "../features/enquiry/enquirySlice";

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
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => a.email.localeCompare(b.email),
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquiries = () => {
  const [open, setOpen] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEnquiries());
  }, [dispatch]);

  const enquiryState = useSelector((state) => state.enquiry.enquiries);

  const data = enquiryState.map((enquiry, i) => ({
    key: i + 1,
    name: enquiry.name,
    email: enquiry.email,
    mobile: enquiry.mobile,

    status: (
      <Select
        style={{ width: 140 }}
        defaultValue={enquiry.status || "submitted"}
        id={`status-${enquiry._id}`}
        onChange={(value) => setEnquiryStatus(value, enquiry._id)}
      >
        <Select.Option value="Submitted">Submitted</Select.Option>
        <Select.Option value="Contacted">Contacted</Select.Option>
        <Select.Option value="In Progress">In Progress</Select.Option>
        <Select.Option value="Resolved">Resolved</Select.Option>
      </Select>
    ),

    action: (
      <>
        <Link
          to={`/dashboard/enquiries/${enquiry._id}`}
          className="text-primary border border-2 rounded-2"
          style={{ padding: "4px 5px" }}
        >
          <AiOutlineEye fontSize={20} />
        </Link>

        <DeleteButton onClick={() => showModal(enquiry._id)} />
      </>
    ),
  }));

  // Delete A Enquiry
  const showModal = (id) => {
    setOpen(true);
    setEnquiryId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const deleteEnquiry = async (id) => {
    try {
      dispatch(deleteAEnquiry(id));
      toast.success("Enquiry deleted successfully!");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to delete Enquiry.");
    }
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  };
  // Delete A Enquiry End

  // Set Enquiry Status
  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enqData: e };
    dispatch(updateAEnquiry(data));
  };
  return (
    <div>
      <h3 className="page-title mb-4">Enquiries</h3>
      {/* Table */}
      {enquiryState.length > 0 ? (
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
        performAction={() => deleteEnquiry(enquiryId)}
        title="Are you sure you want to delete this Enquiry?"
      />
    </div>
  );
};

export default Enquiries;
