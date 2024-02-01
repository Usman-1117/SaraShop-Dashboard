import { Button, Form } from "react-bootstrap";
import CustomInput from "../components/CustomInput";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrands } from "../features/brand/brandSlice";

// Imports End

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newBrand = useSelector((state) => state.brand);
  const { isSuccess, isError, isLoading, createdBrand } = newBrand;

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
        navigate("/dashboard/brand-list");
      }, 2000);
    },
  });
  return (
    <div>
      <h3 className="mb-4">Add Brand</h3>
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
            <Button type="submit" className="button border-0">
              Add Brand
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddBrand;
