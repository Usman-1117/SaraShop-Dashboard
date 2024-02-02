import { Form } from "react-bootstrap";

import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import ValidationError from "../components/ValidationError";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Select } from "antd";
import CustomSelect from "../components/CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../features/blogCategory/blogCategorySlice";
import { toast } from "react-toastify";
import { createBlogs } from "../features/blogs/blogSlice";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categoryState = useSelector(
    (state) => state.blogCategory.blogCategories
  );

  const newBlog = useSelector((state) => state.blog);
  const { isSuccess, isError, isLoading, createdBlogs } = newBlog;

  useEffect(() => {
    if (isSuccess && createdBlogs) {
      toast.success("Blog Added Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdBlogs]);

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
      title: "",
      description: "",
      category: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is Required!"),
      description: Yup.string().required("Description is Required!"),
      category: Yup.string().required("Category is Required!"),
    }),
    onSubmit: (values) => {
      // alert(JSON.stringify(values));
      dispatch(createBlogs(values));
      resetForm();
      setTimeout(() => {
        navigate("/dashboard/blog-list");
      }, 2000);
    },
  });

  return (
    <div>
      <div className="bg-white p-3 p-lg-4 rounded-3">
        <h3 className="page-title mb-4">Add Blog</h3>
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
              placeholder="Select Category"
              id="selectCategory"
              name="category"
              value={values.category}
              onChange={handleChange("category")}
              onBlur={handleBlur("category")}
            >
              <Select.Option value="" label="Select Category" disabled>
                Select Category
              </Select.Option>
              {categoryState.map((Category, i) => (
                <Select.Option
                  key={i}
                  value={Category.title}
                  label={Category.title}
                >
                  {Category.title}
                </Select.Option>
              ))}
            </CustomSelect>
            <ValidationError
              touched={touched.category}
              errors={errors.category}
            />
          </div>

          {/* Description */}
          <div className="mb-3 rounded-5">
            <ReactQuill
              name="description"
              onChange={(value) => handleChange("description")(value)}
              value={values.description}
            />
            <ValidationError
              touched={touched.description}
              errors={errors.description}
            />
          </div>

          {/* Upload Img */}

          {/* Button */}
          <div className="py-4">
            <button type="submit" className="button border-0">
              Add Blog
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddBlog;
