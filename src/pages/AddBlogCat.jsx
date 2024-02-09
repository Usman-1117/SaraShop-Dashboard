import CustomInput from "../components/CustomInput";

import { Form } from "react-bootstrap";
import { Spin } from "antd";

import { useFormik } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetState,
  createBlogCategory,
  getABlogCategory,
  updateABlogCategory,
} from "../features/blogCategory/blogCategorySlice";

const AddBlogCat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const getBlogCatId = location.pathname.split("/")[3];

  // Create Blog Category
  const newBlogCategory = useSelector((state) => state.blogCategory);

  const {
    isSuccess,
    isError,
    isLoading,
    createdBlogCategory,
    updatedBlogCat,
    blogCatName,
  } = newBlogCategory;

  useEffect(() => {
    if (createdBlogCategory && isSuccess) {
      toast.success("Category Created Successfully!");
    }
    if (updatedBlogCat && isSuccess) {
      toast.success("Category Created Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, updatedBlogCat, createdBlogCategory]);
  // Create Blog Category End

  // Update Category
  useEffect(() => {
    if (getBlogCatId !== undefined) {
      dispatch(getABlogCategory(getBlogCatId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogCatId, dispatch]);

  // Formik
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    values,
    errors,
    touched,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCatName || "",
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, "Blog Category Name must be at least 3 characters")
        .required("Blog Category Name is Required!"),
    }),

    onSubmit: (values) => {
      if (getBlogCatId !== undefined) {
        const data = { id: getBlogCatId, blogCategoryData: values };
        dispatch(updateABlogCategory(data));
      } else {
        dispatch(createBlogCategory(values));
      }
      setTimeout(() => {
        dispatch(resetState());
        navigate("/dashboard/blog-category-list");
      }, 800);
    },
  });
  return (
    <>
      <h3 className="mb-4">{getBlogCatId ? "Edit" : "Add"} Blog Category</h3>
      <div>
        <Form onSubmit={handleSubmit}>
          <CustomInput
            id="floatingCategory"
            label="Add Category"
            type="text"
            value={values.title}
            onChange={handleChange("title")}
            onBlur={handleBlur("title")}
            touched={touched.title}
            errors={errors.title}
          />

          {/* Submit Button */}
          <button type="submit" className="button border-0 mt-4">
            {isSubmitting ? (
              <div className="d-flex gap-2">
                <Spin />
                <span>Loading...</span>
              </div>
            ) : (
              <>{getBlogCatId ? "Update" : "Add"} Blog Category</>
            )}
          </button>
          {/* Submit Button End */}
        </Form>
      </div>
    </>
  );
};

export default AddBlogCat;
