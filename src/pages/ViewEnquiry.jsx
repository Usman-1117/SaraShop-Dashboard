import { Select } from "antd";
import { FaArrowLeftLong } from "react-icons/fa6";

import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAEnquiry,
  resetState,
  updateAEnquiry,
} from "../features/enquiry/enquirySlice";
// Imports End

const ViewEnquiry = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getEnqId = location.pathname.split("/")[3];

  const enqState = useSelector((state) => state.enquiry);
  const { enqName, enqMobile, enqEmail, enqComment, enqStatus } = enqState;

  useEffect(() => {
    dispatch(getAEnquiry(getEnqId));
  }, [getEnqId, dispatch]);

  // Set Enquiry Status
  const setEnquiryStatus = (value) => {
    const data = { id: getEnqId, enqData: value };
    dispatch(updateAEnquiry(data));
    dispatch(resetState());

    setTimeout(() => {
      dispatch(getAEnquiry(getEnqId));
    }, 100);
  };

  return (
    <>
      {/* Page Title & Add Button */}
      <div className="d-flex justify-content-between align-items-center my-2">
        <h3 className="page-title">View Enquiries</h3>

        <Link
          to={"/dashboard/enquiries"}
          className="button rounded-1 d-flex gap-2"
          style={{ padding: "10px 12px" }}
        >
          <div className="d-flex align-items-center gap-2">
            <FaArrowLeftLong fontSize={18} />
            Go Back
          </div>
        </Link>
      </div>
      {/* Page Title & Add Button End*/}

      <div className="mt-4 bg-white p-4 rounded d-flex flex-column gap-3">
        {/* Name */}
        <div className="d-flex align-items-center gap-3 ">
          <h6>Name:</h6>
          <p>{enqName}</p>
        </div>

        {/* Mobile */}
        <div className="d-flex align-items-center gap-3">
          <h6>Mobile:</h6>
          <p>
            <a href={`tel:+92${enqMobile}`}> {enqMobile}</a>
          </p>
        </div>

        {/* Email */}
        <div className="d-flex align-items-center gap-3">
          <h6>Email:</h6>
          <a href={`mailto:${enqEmail}`}> {enqEmail}</a>
        </div>

        {/* Comments */}
        <div className="d-flex  gap-3">
          <h6>Comment:</h6>
          <p className="text-justify">{enqComment}</p>
        </div>

        {/* Status */}
        <div className="d-flex align-items-center gap-3">
          <h6>Status:</h6>
          <p>{enqStatus}</p>
        </div>

        {/* Change Status */}
        <div className="d-flex align-items-center gap-3">
          <h6>Change Status:</h6>
          <Select
            style={{ width: 140 }}
            defaultValue="Select Status"
            id={`status-${enqState._id}`}
            onChange={(value) => setEnquiryStatus(value, getEnqId)}
          >
            <Select.Option value="Submitted">Submitted</Select.Option>
            <Select.Option value="Contacted">Contacted</Select.Option>
            <Select.Option value="In Progress">In Progress</Select.Option>
            <Select.Option value="Resolved">Resolved</Select.Option>
          </Select>
        </div>
      </div>
    </>
  );
};

export default ViewEnquiry;
