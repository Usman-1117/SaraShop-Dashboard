// Libraries
import { Select, Spin } from "antd";
import { Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
// Components
import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import ValidationError from "../components/ValidationError";
// Data Fetching
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands } from "../features/brand/brandSlice";
import { getAllCategories } from "../features/prodCategory/prodCategorySlice";
import {
  createProduct,
  getAProduct,
  resetState,
  updateAProduct,
} from "../features/product/productSlice";
// Imports End

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[3];

  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllCategories());
  }, [dispatch]);

  //* Get Brands
  const brandState = useSelector((state) => state.brand.brands);
  //* Get Category
  const categoryState = useSelector(
    (state) => state.prodCategory.prodCategories
  );

  const newProduct = useSelector((state) => state.product);
  const {
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    title,
    description,
    price,
    category,
    brand,
    tags,
    quantity,
  } = newProduct;

  // Create New Prodcut
  useEffect(() => {
    if (createdProduct && isSuccess) {
      toast.success("Product Added Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdProduct]);

  // Update Product
  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getAProduct(getProductId));
    } else {
      dispatch(resetState());
    }
  }, [getProductId, dispatch]);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isSubmitting,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: title || "",
      description: description || "",
      brand: brand || "",
      category: category || "",
      tags: tags || "",
      price: price || "",
      quantity: quantity || "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Title is Required!"),
      description: Yup.string().required("Description is Required!"),
      brand: Yup.string().required("Brand is Required!"),
      category: Yup.string().required("Category is Required!"),
      tags: Yup.string().required("Tags is Required!"),
      price: Yup.number().required("Price is Required!"),
      quantity: Yup.number().required("Quantity is Required!"),
    }),

    onSubmit: (values) => {
      if (getProductId !== undefined) {
        const data = { id: getProductId, productData: values };
        dispatch(updateAProduct(data));
      }
      if (
        title &&
        description &&
        brand &&
        category &&
        tags &&
        price &&
        quantity &&
        isSuccess
      ) {
        toast.success("Product Updated Successfully!");
      } else {
        dispatch(createProduct(values));
      }

      setTimeout(() => {
        navigate("/dashboard/product-list");
        dispatch(resetState());
      }, 800);
    },
  });

  return (
    <div>
      <div className="bg-white p-3 p-lg-4 rounded-3">
        <h3 className="page-title mb-4">
          {getProductId ? "Edit" : "Add"} Product
        </h3>

        {/* Form */}
        <Form onSubmit={handleSubmit}>
          {/* Title */}
          <CustomInput
            type="text"
            name="title"
            id="floatingTitle"
            label="Enter Product Title"
            className="mt-2"
            value={values.title}
            onChange={handleChange("title")}
            onBlur={handleBlur("title")}
            touched={touched.title}
            errors={errors.title}
          />

          {/* Description */}
          <div className="mb-3 rounded-5">
            <ReactQuill
              name="description"
              onChange={handleChange("description")}
              value={values.description}
            />
            <ValidationError
              touched={touched.description}
              errors={errors.description}
            />
          </div>

          {/* Select Brand & Select Category*/}
          <div className="d-flex flex-column flex-lg-row gap-2">
            {/* Brand */}
            <div className="d-flex flex-column flex-grow-1 mb-2">
              <CustomSelect
                id="selectBrand"
                status="error"
                name="brand"
                placeholder="Select Brand"
                value={values.brand}
                onChange={handleChange("brand")}
                onBlur={handleBlur("brand")}
                options={brandState.map((brand) => ({
                  value: brand.title,
                  label: brand.title,
                }))}
              />
              <ValidationError touched={touched.brand} errors={errors.brand} />
            </div>

            {/* Category */}
            <div className="d-flex flex-column flex-grow-1 mb-3">
              <CustomSelect
                placeholder="Select Category"
                id="selectCategory"
                name="category"
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
          </div>

          {/* Tags */}
          <div className="d-flex flex-column flex-grow-1 mb-3">
            <Select
              placeholder="Select Tags"
              id="selectTags"
              name="tags"
              value={values.tags}
              onChange={handleChange("tags")}
              onBlur={handleBlur("tags")}
              style={{ height: "56px" }}
            >
              <Select.Option value="" label="Select Tags" disabled>
                Select Tags
              </Select.Option>

              <Select.Option value="featured">featured</Select.Option>
              <Select.Option value="special">special</Select.Option>
              <Select.Option value="popular">popular</Select.Option>
            </Select>
            <ValidationError touched={touched.tags} errors={errors.tags} />
          </div>

          {/* Select Color */}

          {/* Select Price & Select Quantity*/}
          <div className="d-flex flex-column flex-lg-row gap-0 gap-lg-2">
            {/* Price */}
            <div className="d-flex flex-column flex-grow-1">
              <CustomInput
                type="number"
                id="floatingPrice"
                name="price"
                label="Enter Product Price"
                value={values.price}
                onChange={handleChange("price")}
                onBlur={handleBlur("price")}
                touched={touched.price}
                errors={errors.price}
              />
            </div>

            {/* Quantity */}
            <div className="d-flex flex-column flex-grow-1">
              <CustomInput
                type="number"
                id="floatingQuantity"
                name="quantity"
                label="Enter Product Quantity"
                value={values.quantity}
                onChange={handleChange("quantity")}
                onBlur={handleBlur("quantity")}
                touched={touched.quantity}
                errors={errors.quantity}
              />
            </div>
          </div>

          {/* Upload Img */}

          {/* Button */}
          <button type="submit" className="button border-0 mt-3">
            {isSubmitting ? (
              <div className="d-flex gap-2">
                <Spin />
                <span>Loading...</span>
              </div>
            ) : (
              <>{getProductId !== undefined ? "Update" : "Add"} Product</>
            )}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
