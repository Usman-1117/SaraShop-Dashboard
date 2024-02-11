import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import ValidationError from "../components/ValidationError";

import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import { Spin } from "antd";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCategories } from "../features/blogCategory/blogCategorySlice";
import {
  createBlog,
  getABlog,
  updateABlog,
  resetState,
} from "../features/blogs/blogSlice";
// Imports End

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];

  // Create Blog
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const categoryState = useSelector(
    (state) => state.blogCategory.blogCategories
  );

  const newBlog = useSelector((state) => state.blog);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBlog,
    blogTitle,
    blogCategory,
    blogDescription,
  } = newBlog;

  useEffect(() => {
    if (createdBlog && isSuccess) {
      toast.success("Blog Added Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdBlog,
    blogTitle,
    blogCategory,
    blogDescription,
  ]);
  // Create Blog End

  // Update Blog
  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));

      dispatch(resetState());
    } else {
      dispatch(resetState());
    }
  }, [getBlogId, dispatch]);

  // Formik
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    values,
    touched,
    errors,
    resetForm,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogTitle || "",
      category: blogCategory || "",
      description: blogDescription || "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Title is Required!"),
      category: Yup.string().required("Category is Required!"),
      description: Yup.string().required("Description is Required!"),
    }),

    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateABlog(data));
      }
      if (blogTitle && blogCategory && blogDescription && isSuccess) {
        toast.success("Blog Updated Successfully!");
      } else {
        dispatch(createBlog(values));
        resetForm();
      }

      setTimeout(() => {
        navigate("/dashboard/blog-list");
        dispatch(resetState());
      }, 800);
    },
  });
  // Formik End

  return (
    <div className="bg-white p-3 p-lg-4 rounded-3">
      <h3 className="page-title mb-4">{getBlogId ? "Edit" : "Add"} Blog</h3>

      <Form onSubmit={handleSubmit}>
        {/* Enter Title */}
        <CustomInput
          type="text"
          name="title"
          id="floatingTitle"
          label="Enter Blog Title"
          className="mt-2"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.title}
          touched={touched.title}
          errors={errors.title}
        />

        {/* Select Category */}
        <div className="d-flex flex-column flex-grow-1 mb-3">
          <CustomSelect
            id="selectCategory"
            name="category"
            placeholder="Select Category"
            value={values.category}
            onChange={handleChange("category")}
            onBlur={handleBlur("category")}
            options={categoryState.map((Category) => ({
              value: Category.title,
              label: Category.title,
            }))}
          />
          <ValidationError
            touched={touched.category}
            errors={errors.category}
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <ReactQuill
            name="description"
            value={values.description}
            onChange={(value) => handleChange("description")(value)}
          />
          <ValidationError
            touched={touched.description}
            errors={errors.description}
          />
        </div>

        {/* Upload Img */}

        {/* Submit Button */}
        <button type="submit" className="button border-0 mt-4">
          {isSubmitting ? (
            <div className="d-flex gap-2">
              <Spin />
              <span>Loading...</span>
            </div>
          ) : (
            <>{getBlogId ? "Update" : "Add"} Blog</>
          )}
        </button>
      </Form>
    </div>
  );
};

export default AddBlog;
