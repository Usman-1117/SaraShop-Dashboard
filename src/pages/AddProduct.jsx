import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { Select } from "antd";
// Icons
// import { MdFileUpload } from "react-icons/md";
// Components
import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import ValidationError from "../components/ValidationError";
// Libraries
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import Dropzone from "react-dropzone";

// Data Fetching
import { useDispatch, useSelector } from "react-redux";

import { getAllBrands } from "../features/brand/brandSlice";
import { getAllCategories } from "../features/prodCategory/prodCategorySlice";
import { createProducts, resetState } from "../features/product/productSlice";
// import { getColors } from "../features/color/colorSlice";
// import { uploadImg } from "../features/upload/uploadSlice";

// Imports End

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [color, setColor] = useState([]);

  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllCategories());
    // dispatch(getColors());
  }, [dispatch]);

  //* 1
  const brandState = useSelector((state) => state.brand.brands);
  //* 2
  const categoryState = useSelector(
    (state) => state.prodCategory.prodCategories
  );
  //* 3
  // const colorState = useSelector((state) => state.color.colors);
  // const colorOpt = [];
  // colorState.forEach((i) => {
  //   colorOpt.push({
  //     label: i.title,
  //     value: i._id,
  //   });
  // });
  // const handleColor = (e) => {
  //   setColor(e);
  //   console.log(e);
  // };

  //* 4
  // const imgState = useSelector((state) => state.upload.images);

  // useEffect(() => {
  //   values.color = color ? color : " ";
  // });

  //* 5
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdProduct]);

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
      brand: "",
      category: "",
      tags: "",
      // colors: [],
      price: "",
      quantity: "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Title is Required!"),
      description: Yup.string().required("Description is Required!"),
      brand: Yup.string().required("Brand is Required!"),
      category: Yup.string().required("Category is Required!"),
      tags: Yup.string().required("Tags is Required!"),
      // colors: Yup.array()
      //   .min(1, "Pick at least one color")
      //   .required("Color is Required"),
      price: Yup.number().required("Price is Required!"),
      quantity: Yup.number().required("Quantity is Required!"),
    }),

    onSubmit: (values) => {
      // alert(JSON.stringify(values));
      dispatch(createProducts(values));
      resetForm();
      setTimeout(() => {
        navigate("/dashboard/product-list");
        dispatch(resetState());
      }, 2000);
    },
  });

  return (
    <div>
      <div className="bg-white p-3 p-lg-4 rounded-3">
        <h3 className="page-title mb-4">Add Product</h3>

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
                value={values.brand}
                onChange={handleChange("brand")}
                onBlur={handleBlur("brand")}
              >
                <Select.Option value="" label="Select Brand" disabled>
                  Select Brand
                </Select.Option>
                {brandState.map((brand, i) => (
                  <Select.Option
                    key={i}
                    value={brand.title}
                    label={brand.title}
                  >
                    {brand.title}
                  </Select.Option>
                ))}
              </CustomSelect>

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
          </div>

          {/* Tags */}
          <div className="d-flex flex-column flex-grow-1 mb-3">
            <CustomSelect
              placeholder="Select Tags"
              id="selectTags"
              name="tags"
              value={values.tags}
              onChange={handleChange("tags")}
              onBlur={handleBlur("tags")}
            >
              <Select.Option value="" label="Select Tags" disabled>
                Select Tags
              </Select.Option>

              <Select.Option value="featured">Featured</Select.Option>
              <Select.Option value="special">Special</Select.Option>
              <Select.Option value="poplur">Poplur</Select.Option>
            </CustomSelect>
            <ValidationError touched={touched.tags} errors={errors.tags} />
          </div>

          {/* Select Color */}
          {/* <div className="mb-3">
            <CustomSelect
              mode="multiple"
              placeholder="Select Colors"
              defaultValue={color}
              id="selectcolor"
              name="color"
              value={values.color}
              onChange={(i) => handleColor(i)}
              options={colorOpt}
              onBlur={handleBlur("color")}
            />
            <ValidationError touched={touched.colors} errors={errors.colors} />
          </div> */}

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
                onChange={handleChange("quantity")}
                onBlur={handleBlur("quantity")}
                touched={touched.quantity}
                errors={errors.quantity}
              />
            </div>
          </div>

          {/* Upload Img */}
          {/* <div className="border border-1 p-5 text-center rounded-2">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />

                    <div
                      className="d-flex flex-column gap-2"
                      style={{ cursor: "pointer" }}
                    >
                      <p className="upload-icon">
                        <MdFileUpload fontSize={40} />
                      </p>
                      <p className="upload-text">
                        Click or drag file to this area to upload
                      </p>
                    </div>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="product-images">
            {Array.isArray(imgState) &&
              imgState.map((img, i) => {
                return (
                  <div key={i}>
                    <img src={img.url} alt="" />
                  </div>
                );
              })}
          </div> */}

          {/* Button */}
          <div className="py-4">
            <button type="submit" className="button border-0">
              {isLoading ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
