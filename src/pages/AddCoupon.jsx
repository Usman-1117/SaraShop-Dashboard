import CustomInput from "../components/CustomInput";
import { Form } from "react-bootstrap";

import { useFormik } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  createCoupons,
  getACoupon,
  resetState,
} from "../features/coupon/couponSlice";
// Imports End

const AddCoupon = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getCouponId = location.pathname.split("/")[3];

  const newCoupon = useSelector((state) => state.coupon);
  const { isSuccess, isError, isLoading, createdCoupon } = newCoupon;

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId]);

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon Created Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdCoupon]);

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
      name: "",
      expiry: "",
      discount: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Coupon Name is Required!"),
      expiry: Yup.date().required("Expiry Date is Required!"),
      discount: Yup.number().required("Discount Percentage is Required!"),
    }),

    onSubmit: (values) => {
      //   alert(JSON.stringify(values));
      dispatch(createCoupons(values));
      resetForm();
      dispatch(resetState());
    },
  });
  return (
    <div>
      <h3 className="my-3">
        {getCouponId !== undefined ? "Update" : "Add"} Coupon
      </h3>
      <div>
        <Form onSubmit={handleSubmit}>
          {/* Coupon Name */}
          <CustomInput
            type="text"
            id="name"
            label="Add Coupon"
            name="name"
            value={values.name}
            onChange={handleChange("name")}
            onBlur={handleBlur("name")}
            touched={touched.name}
            errors={errors.name}
          />

          {/*  Expiry */}
          <div className="d-flex flex-column flex-lg-row gap-0 gap-lg-2">
            <div className="d-flex flex-column flex-grow-1">
              <CustomInput
                type="date"
                id="expiry"
                label="Entery Expiry Date"
                name="expiry"
                value={values.expiry}
                onChange={handleChange("expiry")}
                onBlur={handleBlur("expiry")}
                touched={touched.expiry}
                errors={errors.expiry}
              />
            </div>

            {/* Discount  */}
            <div className="d-flex flex-column flex-grow-1">
              <CustomInput
                type="number"
                id="discount"
                label="Enter Discount"
                name="discount"
                value={values.discount}
                onChange={handleChange("discount")}
                onBlur={handleBlur("discount")}
                touched={touched.discount}
                errors={errors.discount}
              />
            </div>
          </div>

          {/* button */}
          <div className="py-3">
            <button type="submit" className="button border-0">
              {getCouponId !== undefined ? "Update" : "Add"} Coupon
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddCoupon;
