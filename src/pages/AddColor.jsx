// import { Form } from "react-bootstrap";
// import { ColorPicker, Divider, Row, Col, theme } from "antd";
// import { generate, green, presetPalettes, red, gold } from "@ant-design/colors";

// import { toast } from "react-toastify";

// import { useEffect } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { createColors, resetState } from "../features/color/colorSlice";

// const genPresets = (presets = presetPalettes) =>
//   Object.entries(presets).map(([label, colors]) => ({
//     label,
//     colors,
//   }));

// const AddColor = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const newColor = useSelector((state) => state.color);
//   const { isSuccess, isError, isLoading, createdColor } = newColor;

//   // Create Color
//   useEffect(() => {
//     if (createdColor && isSuccess) {
//       toast.success("Color Created Successfully!");
//     }
//     if (isError) {
//       toast.error("Something Went Wrong!");
//     }
//   }, [isSuccess, isError, isLoading, createdColor]);

//   const formik = useFormik({
//     initialValues: {
//       title: "",
//     },
//     validationSchema: Yup.object({
//       title: Yup.string().required("Color is Required!"),
//     }),

//     // Submiting Form
//     onSubmit: (values) => {
//       dispatch(createColors(values));
//       setTimeout(() => {
//         dispatch(resetState());
//         navigate("/dashboard/color-list");
//       }, 1000);
//     },
//   });

//   // Color Picker Theme
//   const { token } = theme.useToken();
//   const presets = genPresets({
//     primary: generate(token.colorPrimary),
//     red,
//     green,
//     gold,
//   });

//   const customPanelRender = (_, { components: { Picker, Presets } }) => (
//     <Row justify="space-between" wrap={false}>
//       <Col span={12}>
//         <Presets />
//       </Col>
//       <Divider
//         type="vertical"
//         style={{
//           height: "auto",
//         }}
//       />
//       <Col flex="auto">
//         <Picker />
//       </Col>
//     </Row>
//   );

//   return (
//     <div>
//       <h3 className="mb-4">Add Color</h3>
//       <div>
//         <Form onSubmit={formik.handleSubmit}>
//           <div className="d-flex align-items-center gap-3">
//             <span>Select Color:</span>
//             <ColorPicker
//               defaultValue={token.colorPrimary}
//               presets={presets}
//               panelRender={customPanelRender}
//               value={formik.title}
//               onChange={formik.handleChange("title")}
//               onBlur={formik.handleBlur("title")}
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="py-4">
//             <button type="submit" className="button border-0">
//               Add Color
//             </button>
//           </div>
//           {/* Submit Button End */}
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default AddColor;
import { Form } from "react-bootstrap";
import { ColorPicker, Divider, Row, Col, theme } from "antd";
import { generate, green, presetPalettes, red, gold } from "@ant-design/colors";

import { toast } from "react-toastify";

import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createColors, resetState } from "../features/color/colorSlice";

const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map(([label, colors]) => ({
    label,
    colors,
  }));

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newColor = useSelector((state) => state.color);
  const { isSuccess, isError, isLoading, createdColor } = newColor;

  // Create Color
  useEffect(() => {
    if (createdColor && isSuccess) {
      toast.success("Color Created Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdColor]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Color is Required!"),
    }),

    // Submiting Form
    onSubmit: (values) => {
      dispatch(createColors(values));
      setTimeout(() => {
        dispatch(resetState());
        navigate("/dashboard/color-list");
      }, 1000);
    },
  });

  // Color Picker Theme
  const { token } = theme.useToken();
  const presets = genPresets({
    primary: generate(token.colorPrimary),
    red,
    green,
    gold,
  });

  const customPanelRender = (_, { components: { Picker, Presets } }) => (
    <Row justify="space-between" wrap={false}>
      <Col span={12}>
        <Presets />
      </Col>
      <Divider
        type="vertical"
        style={{
          height: "auto",
        }}
      />
      <Col flex="auto">
        <Picker />
      </Col>
    </Row>
  );

  return (
    <div>
      <h3 className="mb-4">Add Color</h3>
      <div>
        <Form onSubmit={formik.handleSubmit}>
          <div className="d-flex align-items-center gap-3">
            <span>Select Color:</span>

            <ColorPicker
              defaultValue={token.colorPrimary}
              presets={presets}
              panelRender={customPanelRender}
              value={formik.values.title}
              onBlur={formik.handleBlur("title")}
              onChange={(color) => {
                const colorValue = color?.metaColor?.originalInput || "";
                formik.setFieldValue("title", colorValue);
              }}
            />
          </div>

          {/* Error Message */}
          {formik.touched.title && formik.errors.title ? (
            <div className="text-danger mt-2">{formik.errors.title}</div>
          ) : null}

          {/* Submit Button */}
          <div className="py-4">
            <button type="submit" className="button border-0">
              Add Color
            </button>
          </div>
          {/* Submit Button End */}
        </Form>
      </div>
    </div>
  );
};

export default AddColor;
