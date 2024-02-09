import CustomInput from "../components/CustomInput";
import { Form } from "react-bootstrap";
import { Spin } from "antd";

import { useFormik } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createCoupons,
  getACoupon,
  updateACoupon,
  resetState,
} from "../features/coupon/couponSlice";
// Imports End

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCouponId = location.pathname.split("/")[3];

  const newCoupon = useSelector((state) => state.coupon);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    couponName,
    couponDiscount,
    couponExpiry,
  } = newCoupon;

  // Create Coupon
  useEffect(() => {
    if (createdCoupon && isSuccess) {
      toast.success("Coupon Created Successfully!");
    }
    // if (couponName && couponDiscount && couponExpiry && isSuccess) {
    //   toast.success("Coupon Updated Successfully!");
    // }
    if (couponName && couponDiscount && couponExpiry && isError) {
      toast.error("Something Went Wrong!");
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    couponName,
    couponDiscount,
    couponExpiry,
  ]);

  // Update Coupon
  const changeDateFormet = (date) => {
    if (!date) return "";
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  };

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId));
      dispatch(resetState());
    } else {
      dispatch(resetState());
    }
  }, [getCouponId, dispatch]);

  // Formik
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    values,
    touched,
    errors,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      expiry: changeDateFormet(couponExpiry) || "",
      discount: couponDiscount || "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Coupon Name is Required!"),
      expiry: Yup.date().required("Expiry Date is Required!"),
      discount: Yup.number().required("Discount Percentage is Required!"),
    }),

    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateACoupon(data));
      } else {
        dispatch(createCoupons(values));
      }
      setTimeout(() => {
        dispatch(resetState());
        navigate("/dashboard/coupon-list");
      }, 1000);
    },
  });
  // Formik End

  return (
    <div>
      <h3 className="my-3">
        {getCouponId !== undefined ? "Edit" : "Add"} Coupon
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
          <button type="submit" className="button border-0 mt-4">
            {isSubmitting ? (
              <div className="d-flex gap-2">
                <Spin />
                <span>Loading...</span>
              </div>
            ) : (
              <>{getCouponId !== undefined ? "Update" : "Add"} Coupon</>
            )}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default AddCoupon;
