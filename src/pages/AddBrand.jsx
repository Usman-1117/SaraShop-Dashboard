import { Form } from "react-bootstrap";
import CustomInput from "../components/CustomInput";

const AddBrand = () => {
  return (
    <div>
      <h3 className="mb-4">Add Brand</h3>
      <div>
        <Form>
          <CustomInput
            id="floatingBrand"
            label="Add Brand"
            type="text"
            className="mb-3"
          />
          <div className="py-4">
            <button type="submit" className="button border-0">
              Add Brand
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddBrand;
