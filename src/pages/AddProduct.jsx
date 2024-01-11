import { Form } from "react-bootstrap";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import ImageUpload from "../components/ImageUpload";

const AddProduct = () => {
  const [desc, setDesc] = useState("");
  const handleDesc = (e) => {
    setDesc(e);
    console.log(e);
  };
  return (
    <div>
      <h3 className="page-title mb-3">Add Product</h3>
      <div className="bg-white p-2 p-lg-4 rounded-3">
        <Form>
          {/* Title */}
          <CustomInput
            name="title"
            id="floatingTitle"
            label="Enter Blog Title"
            type="text"
            className="mb-3"
          />

          {/* Description */}
          <div className=" mb-3">
            <ReactQuill
              id="description"
              name="description"
              style={{ backgroundColor: "white" }}
              value={desc}
              onChange={handleDesc}
            />
          </div>

          <div className="d-flex flex-column flex-lg-row gap-2">
            {/* Select Brand */}
            <Form.Select
              aria-label="Select Brand"
              id="selectBrand"
              name="brand"
              className="py-3 mb-3"
            >
              <option>Select Brand</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>

            {/* Select Category */}
            <Form.Select
              aria-label="Select Category"
              id="selectCategory"
              name="category"
              className="py-3 mb-3"
            >
              <option>Select Category</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </div>

          {/* Select Color */}
          <Form.Select
            aria-label="Select Color"
            id="selectColor"
            name="color"
            className="py-3 mb-3"
          >
            <option>Select Color</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>

          {/* Price */}
          <CustomInput
            id="floatingPrice"
            name="price"
            label="Enter Product Price"
            type="number"
            className="mb-3"
          />

          {/* Upload Img */}
          <ImageUpload />

          {/* Button */}
          <div className="py-3">
            <button className="button border-0">Add Product</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
