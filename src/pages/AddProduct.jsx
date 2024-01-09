import { Form } from "react-bootstrap";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const AddProduct = () => {
  const [desc, setDesc] = useState("");
  const handleDesc = (e) => {
    setDesc(e);
    console.log(e);
  };
  return (
    <div className="bg-white p-4 rounded-3">
      <h3 className="mb-4">Add Product</h3>
      <Form>
        {/* Title */}
        <CustomInput
          id="floatingTitle"
          label="Enter Blog Title"
          type="text"
          className="mb-3"
        />

        {/* Description */}
        <div className=" mb-3">
          <ReactQuill
            style={{ backgroundColor: "white" }}
            value={desc}
            onChange={handleDesc}
          />
        </div>

        <div className="d-flex flex-column flex-lg-row gap-2">
          {/* Select Brand */}
          <Form.Select aria-label="Select Brand" className="py-3 mb-3">
            <option>Select Brand</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>

          {/* Select Category */}
          <Form.Select aria-label="Select Category" className="py-3 mb-3">
            <option>Select Category</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </div>

        {/* Select Color */}
        <Form.Select aria-label="Select Color" className="py-3 mb-3">
          <option>Select Color</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>

        {/* Price */}
        <CustomInput
          id="floatingPrice"
          label="Enter Product Price"
          type="number"
          className="mb-3"
        />

        {/* Upload Img */}
        <div className="mb-4">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
        </div>
        {/* Button */}
        <div className="py-5">
          <button className="button border-0">Add Product</button>
        </div>
      </Form>
    </div>
  );
};

export default AddProduct;
