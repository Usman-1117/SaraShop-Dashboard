import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Auth
import Login from "./pages/Auth/Login";
import Forgotpassword from "./pages/Auth/Forgotpassword";
import Resetpassword from "./pages/Auth/Resetpassword";
// Components
import MainLayout from "./components/MainLayout/MainLayout";
// Pages
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";

import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";
import AddBrand from "./pages/AddBrand";
import BrandList from "./pages/BrandList";
import AddProdCategory from "./pages/AddProdCategory";
import ProdCategoryList from "./pages/ProdCategoryList";
import AddColor from "./pages/AddColor";
import ColorList from "./pages/ColorList";

import Orders from "./pages/Orders";

import AddBlog from "./pages/AddBlog";
import Bloglist from "./pages/Bloglist";
import AddBlogCat from "./pages/AddBlogCat";
import BlogCatlist from "./pages/BlogCatlist";

import Enquiries from "./pages/Enquiries";
import AddCoupon from "./pages/AddCoupon";
import Couponlist from "./pages/Couponlist";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<Forgotpassword />} />
          <Route path="/reset-password" element={<Resetpassword />} />

          {/* Pages */}
          <Route path="/dashboard" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="product" element={<AddProduct />} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="brand" element={<AddBrand />} />
            <Route path="brand/:id" element={<AddBrand />} />
            <Route path="brand-list" element={<BrandList />} />
            <Route path="category" element={<AddProdCategory />} />
            <Route path="category/:id" element={<AddProdCategory />} />
            <Route path="category-list" element={<ProdCategoryList />} />
            <Route path="color" element={<AddColor />} />
            <Route path="color/:id" element={<AddColor />} />
            <Route path="color-list" element={<ColorList />} />
            <Route path="orders" element={<Orders />} />
            <Route path="coupon" element={<AddCoupon />} />
            <Route path="coupon/:id" element={<AddCoupon />} />
            <Route path="coupon-list" element={<Couponlist />} />
            <Route path="blog" element={<AddBlog />} />
            <Route path="blog-list" element={<Bloglist />} />
            <Route path="blog-category" element={<AddBlogCat />} />
            <Route path="blog-category-list" element={<BlogCatlist />} />
            <Route path="enquiries" element={<Enquiries />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
