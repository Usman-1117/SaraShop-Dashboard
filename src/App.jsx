import { BrowserRouter, Route, Routes } from "react-router-dom";
// Auth
import Login from "./pages/Auth/Login";
import Forgotpassword from "./pages/Auth/Forgotpassword";
import Resetpassword from "./pages/Auth/Resetpassword";
// Components
import MainLayout from "./components/MainLayout/MainLayout";
// Pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Enquiries from "./pages/Enquiries/Enquiries";
import Bloglist from "./pages/Bloglist/Bloglist";
import BlogCatlist from "./pages/BlogCatlist/BlogCatlist";
import Orders from "./pages/Orders/Orders";
import Customers from "./pages/Customers/Customers";
import ColorList from "./pages/ColorList/ColorList";
import CategoryList from "./pages/CategoryList/CategoryList";
import BrandList from "./pages/BrandList/BrandList";
import ProductList from "./pages/ProductList/ProductList";
import AddBlog from "./pages/AddBlog/AddBlog";
import AddBlogCat from "./pages/AddBlogCat/AddBlogCat";
import AddColor from "./pages/AddColor";
import AddCategory from "./pages/AddCategory";
import AddBrand from "./pages/AddBrand";
import AddProduct from "./pages/AddProduct";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<Forgotpassword />} />
          <Route path="/reset-password" element={<Resetpassword />} />
          {/* Pages */}

          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="orders" element={<Orders />} />
            <Route path="product" element={<AddProduct />} />
            <Route path="brand" element={<AddBrand />} />
            <Route path="category" element={<AddCategory />} />
            <Route path="color" element={<AddColor />} />
            <Route path="blog" element={<AddBlog />} />
            <Route path="blog-category" element={<AddBlogCat />} />
            <Route path="blog-list" element={<Bloglist />} />
            <Route path="blog-category-list" element={<BlogCatlist />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="color-list" element={<ColorList />} />
            <Route path="category-list" element={<CategoryList />} />
            <Route path="brand-list" element={<BrandList />} />
            <Route path="product-list" element={<ProductList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
