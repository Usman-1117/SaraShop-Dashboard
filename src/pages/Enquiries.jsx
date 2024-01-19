import { Empty, Table } from "antd";
import { Link } from "react-router-dom";
// Icons
import { FaTrashCan } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getEnquiries } from "../features/enquiry/enquirySlice";

const columns = [
  {
    title: "Sr No.",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEnquiries());
  }, [dispatch]);

  const enquiryState = useSelector((state) => state.enquiry.enquiries);

  const data = enquiryState.map((enquiry, index) => ({
    key: index + 1,
    name: enquiry.name,
    email: enquiry.email,
    mobile: enquiry.mobile,

    // status: (
    //   <select
    //     name="status"
    //     id={`status-${enquiry.id}`}
    //     className="form-control form-select"
    //   >
    //     <option value="" disabled selected>
    //       Set Status
    //     </option>
    //     <option value="">123</option>
    //   </select>
    // ),

    action: (
      <>
        <Link to="/" className="ms-4 fs-5 " style={{ color: "#CC0000" }}>
          <FaTrashCan />
        </Link>
      </>
    ),
  }));
  return (
    <div>
      <h3 className="page-title mb-4">Enquiries</h3>
      {enquiryState.length > 0 ? (
        <div className="table-container">
          <Table columns={columns} dataSource={data} />
        </div>
      ) : (
        <Empty description="No data available" />
      )}
    </div>
  );
};

export default Enquiries;
