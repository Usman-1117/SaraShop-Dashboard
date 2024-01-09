import "./AddBlog.scss";
import { useState } from "react";

import { Form, Button } from "react-bootstrap";

import CustomInput from "../../components/CustomInput";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

const AddBlog = () => {
  const [desc, setDesc] = useState("");

  const handleDesc = (e) => {
    setDesc(e);
    console.log(e);
  };

  return (
    <div>
      <h3 className="mb-4">Add Blog</h3>

      <div className="bg-white p-4 rounded-3">
        <Form>
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

          {/* Enter Title */}
          <CustomInput
            id="floatingTitle"
            label="Enter Blog Title"
            type="text"
            className="mb-3"
          />

          {/* Select Category */}
          <Form.Select className="mb-3">
            <option value="">Select Blog Category</option>
          </Form.Select>

          {/* Description */}
          <ReactQuill
            style={{ backgroundColor: "white" }}
            value={desc}
            onChange={handleDesc}
          />

          {/* Button */}
          <div className="py-4">
            <Button type="submit" className="button border-0">
              Add Blog
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddBlog;
