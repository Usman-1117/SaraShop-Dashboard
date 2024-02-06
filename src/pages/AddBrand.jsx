import CustomInput from "../components/CustomInput";

import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createBrands,
  getABrand,
  updateABrand,
  resetState,
} from "../features/brand/brandSlice";

// Imports End

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBrandId = location.pathname.split("/")[3];

  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand;

  // Create Brand
  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfully!");
    }
    if (updatedBrand && isSuccess) {
      toast.success("Brand Updated Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdBrand, updatedBrand]);

  // Update Brand
  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId, dispatch]);

  // Formik
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    resetForm,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Brand Name is Required!"),
    }),

    // Submit
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateABrand(data));
      } else {
        dispatch(createBrands(values));
        resetForm();
      }
      setTimeout(() => {
        dispatch(resetState());
        navigate("/dashboard/brand-list");
      }, 1200);
    },
  });
  return (
    <div>
      <h3 className="mb-4">
        {getBrandId !== undefined ? "Edit" : "Add"} Brand
      </h3>
      <div>
        <Form onSubmit={handleSubmit}>
          <CustomInput
            type="text"
            id="floatingBrand"
            label="Add Brand"
            name="title"
            value={values.title}
            onChange={handleChange("title")}
            onBlur={handleBlur("title")}
            touched={touched.title}
            errors={errors.title}
          />

          <div className="py-4">
            <button type="submit" className="button border-0">
              {getBrandId !== undefined ? "Update" : "Add"} Brand
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddBrand;
