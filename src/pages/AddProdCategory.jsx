import CustomInput from "../components/CustomInput";

import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Spin } from "antd";
import { toast } from "react-toastify";

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  getACategory,
  updateACategory,
  resetState,
} from "../features/prodCategory/prodCategorySlice";
// Imports End

const AddProdCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const getCategoryId = location.pathname.split("/")[3];

  const newCategory = useSelector((state) => state.prodCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    updatedCategory,
    categoryName,
  } = newCategory;

  // Create Category
  useEffect(() => {
    if (createdCategory && isSuccess) {
      toast.success("Category Created Successfully!");
    }
    if (updatedCategory && isSuccess) {
      toast.success("Category Updated Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdCategory, updatedCategory]);

  // Update Category
  useEffect(() => {
    if (getCategoryId !== undefined) {
      dispatch(getACategory(getCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getCategoryId, dispatch]);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    values,
    touched,
    errors,
    // resetForm,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Category Name is Required!"),
    }),

    // Submiting Form
    onSubmit: (values) => {
      if (getCategoryId !== undefined) {
        const data = { id: getCategoryId, categoryData: values };
        dispatch(updateACategory(data));
      } else {
        dispatch(createCategory(values));
        // resetForm();
      }
      setTimeout(() => {
        dispatch(resetState());
        navigate("/dashboard/category-list");
      }, 1000);
    },
  });

  return (
    <div>
      <h3 className="mb-4">
        {getCategoryId !== undefined ? "Edit" : "Add"} Category
      </h3>
      <div>
        <Form onSubmit={handleSubmit}>
          <CustomInput
            type="text"
            id="floatingCategory"
            label="Add Category"
            name="category"
            value={values.title}
            onChange={handleChange("title")}
            onBlur={handleBlur("title")}
            touched={touched.title}
            errors={errors.title}
          />

          <div className="py-4">
            <button
              type="submit"
              className="button border-0"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="d-flex gap-2">
                  <Spin style={{ color: "red" }} />
                  <span>Loading...</span>
                </div>
              ) : (
                <>{getCategoryId !== undefined ? "Update" : "Add"} Category</>
              )}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddProdCategory;
