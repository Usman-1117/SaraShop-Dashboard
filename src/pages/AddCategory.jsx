import { Button, Form } from "react-bootstrap";
import CustomInput from "../components/CustomInput";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../features/prodCategory/prodCategorySlice";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newCategory = useSelector((state) => state.prodCategory);
  const { isSuccess, isError, isLoading, createdBrand } = newCategory;

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdBrand]);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    resetForm,
  } = useFormik({
    initialValues: {
      category: "",
    },

    validationSchema: Yup.object({
      category: Yup.string().required("Category Name is Required!"),
    }),

    onSubmit: (values) => {
      // alert(JSON.stringify(values));
      dispatch(createCategory(values));
      resetForm();
      setTimeout(() => {
        navigate("/dashboard/category-list");
      }, 2000);
    },
  });

  return (
    <div>
      <h3 className="mb-4">Add Product Category</h3>
      <div>
        <Form onSubmit={handleSubmit}>
          <CustomInput
            type="text"
            id="floatingCategory"
            label="Add Category"
            name="category"
            className="mt-2"
            value={values.category}
            onChange={handleChange("category")}
            onBlur={handleBlur("category")}
            touched={touched.category}
            errors={errors.category}
          />

          <div className="py-4">
            <Button type="submit" className="button border-0">
              Add Category
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddCategory;
