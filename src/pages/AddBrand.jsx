import { Form } from "react-bootstrap";
import CustomInput from "../components/CustomInput";

import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrands,
  getABrand,
  resetState,
} from "../features/brand/brandSlice";

// Imports End

const AddBrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const newBrand = useSelector((state) => state.brand);
  const { isSuccess, isError, isLoading, createdBrand, brandName } = newBrand;

  const getBrandId = location.pathname.split("/")[3];
  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
      values.title = brandName;
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

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
      brand: "",
    },

    validationSchema: Yup.object({
      brand: Yup.string().required("Brand Name is Required!"),
    }),

    onSubmit: (values) => {
      // alert(JSON.stringify(values));
      dispatch(createBrands(values));
      resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 2000);
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
            name="brand"
            className="mt-2"
            value={values.brand}
            onChange={handleChange("brand")}
            onBlur={handleBlur("brand")}
            touched={touched.brand}
            errors={errors.brand}
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
