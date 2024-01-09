import { Form } from "react-bootstrap";
import CustomInput from "../components/CustomInput";

const AddCategory = () => {
  return (
    <div>
      <h3 className="mb-4">Add Category</h3>
      <div>
        <Form>
          <CustomInput
            id="floatingCategory"
            label="Add Category"
            type="text"
            className="mb-3"
          />
          <div className="py-4">
            <button type="submit" className="button border-0">
              Add Category
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddCategory;
