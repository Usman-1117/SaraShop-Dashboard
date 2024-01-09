import { Button, Form } from "react-bootstrap";
import CustomInput from "../components/CustomInput";

const AddColor = () => {
  return (
    <div>
      <h3 className="mb-4">Add Color</h3>
      <div>
        <Form>
          <CustomInput
            id="floatingColor"
            label="Add Color"
            type="color"
            className="mb-3"
          />
          <div className="py-4">
            <Button type="submit" className="button border-0">
              Add Color
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddColor;
