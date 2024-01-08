import { Form, Button } from "react-bootstrap";
import CustomInput from "../../components/CustomInput";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Stepper } from "react-form-stepper";

const AddBlog = () => {
  const [desc, setDesc] = useState("");

  const handleDesc = (e) => {
    setDesc(e);
    console.log(e);
  };

  return (
    <div>
      <h3 className="mb-4">Add Blog</h3>
      <Stepper
        steps={[
          { label: "Add Blog Details" },
          { label: "Upload Images" },
          { label: "Finished" },
        ]}
        activeStep={1}
      />
      <div>
        <Form>
          <CustomInput
            id="floatingTitle"
            label="Enter Blog Title"
            type="text"
            className="mb-3"
          />
          <Form.Select className="mb-3">
            <option value="">Select Blog Category</option>
          </Form.Select>
          <ReactQuill
            style={{ backgroundColor: "white" }}
            value={desc}
            onChange={handleDesc}
          />
          <div className="py-4">
            <Button type="submit" variant="primary">
              Add Blog
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddBlog;
