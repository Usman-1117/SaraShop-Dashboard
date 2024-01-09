import { Button, Form } from "react-bootstrap";
import CustomInput from "../../components/CustomInput";

const AddBlogCat = () => {
  return (
    <div>
      <h3 className="mb-4">Add Blog Category</h3>
      <div>
        <Form>
          <CustomInput
            id="floatingCategory"
            label="Add Category"
            type="text"
            className="mb-3"
          />
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

export default AddBlogCat;
