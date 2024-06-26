import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import userProfile from "../../assets/user.jpg";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// React Icons
import { TbBrandStripe, TbZoomInArea } from "react-icons/tb";
import { BiCategory, BiSolidColorFill } from "react-icons/bi";
import { FaBloggerB, FaListCheck } from "react-icons/fa6";
import { IoBagAddOutline, IoLogoStencil } from "react-icons/io5";
import { LuLayoutDashboard, LuUsers2 } from "react-icons/lu";
import { RiCouponLine } from "react-icons/ri";
import {
  MdOutlineProductionQuantityLimits,
  MdAddToQueue,
  MdNotificationsActive,
  MdAddChart,
} from "react-icons/md";

// Ant Design Imports
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
const { Header, Sider, Content } = Layout;
// Imports End

// Side Menu Items
const menuItems = [
  {
    key: "",
    icon: <LuLayoutDashboard className="fs-4" />,
    label: "Dashboard",
  },
  {
    key: "customers",
    icon: <LuUsers2 className="fs-4" />,
    label: "Customers",
  },
  {
    key: "catalog",
    icon: <MdOutlineProductionQuantityLimits className="fs-4" />,
    label: "Catalog",
    children: [
      {
        key: "product",
        icon: <IoBagAddOutline className="fs-5" />,
        label: "Add Products",
      },
      {
        key: "product-list",
        icon: <IoBagAddOutline className="fs-5" />,
        label: "Product List",
      },
      {
        key: "brand",
        icon: <TbBrandStripe className="fs-5" />,
        label: "Brand",
      },
      {
        key: "brand-list",
        icon: <TbBrandStripe className="fs-5" />,
        label: "Brand List",
      },
      {
        key: "category",
        icon: <BiCategory className="fs-5" />,
        label: "Category",
      },
      {
        key: "category-list",
        icon: <BiCategory className="fs-5" />,
        label: "Category List",
      },
      {
        key: "color",
        icon: <BiSolidColorFill className="fs-5" />,
        label: "Color",
      },
      {
        key: "color-list",
        icon: <BiSolidColorFill className="fs-5" />,
        label: "Color List",
      },
    ],
  },
  {
    key: "orders",
    icon: <FaListCheck className="fs-4" />,
    label: "Orders",
  },
  {
    key: "marketing",
    icon: <RiCouponLine className="fs-4" />,
    label: "Marketing",
    children: [
      {
        key: "coupon",
        icon: <MdAddChart className="fs-5" />,
        label: "Add Coupon",
      },
      {
        key: "coupon-list",
        icon: <MdAddChart className="fs-5" />,
        label: "Coupon List",
      },
    ],
  },
  {
    key: "blogs",
    icon: <FaBloggerB className="fs-4" />,
    label: "Blogs",
    children: [
      {
        key: "blog",
        icon: <MdAddToQueue className="fs-5" />,
        label: "Add Blog",
      },
      {
        key: "blog-list",
        icon: <MdAddToQueue className="fs-5" />,
        label: "Blog List",
      },
      {
        key: "blog-category",
        icon: <BiCategory className="fs-5" />,
        label: "Add Blog Category",
      },
      {
        key: "blog-category-list",
        icon: <BiCategory className="fs-5" />,
        label: "Blog Category List",
      },
    ],
  },
  {
    key: "enquiries",
    icon: <TbZoomInArea className="fs-4" />,
    label: "Enquiries",
  },
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="min-vh-100">
      {/* Side Menu Start*/}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/*side Logo */}
        <div className="logo">
          <h2 className=" d-flex justify-content-center p-3 text-white">
            <IoLogoStencil fontSize={30} className="sm-logo" />
            <span className="lg-logo">SaraShop</span>
          </h2>
        </div>
        {/* Side Logo End*/}

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems}
          onClick={({ key }) => {
            if (key === "signout") {
              /* empty */
            } else {
              navigate(key);
            }
          }}
        />
      </Sider>
      {/* Side Menu End*/}

      <Layout>
        <Header
          className="d-flex justify-content-between ps-1 pe-4"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          {/* User Info header */}
          <div className=" d-flex align-items-center gap-5">
            {/* Notification Icon */}
            <div className="notification-icon position-relative">
              <MdNotificationsActive fontSize={28} />
              <span className="position-absolute badge bg-warning rounded p-2">
                3
              </span>
            </div>
            {/* Notification Icon End */}

            <div className="user-info d-flex align-items-center gap-2">
              <img
                src={userProfile}
                alt="user profile"
                className="user-profile"
              />

              <div className="user-details d-none d-lg-flex flex-column">
                <h5 className="user-name">Muhammad Usman</h5>
                <p className="user-email">muhammad.usman@gmail.com</p>
              </div>
            </div>
          </div>
          {/* User Info header End*/}
        </Header>

        <Content
          style={{
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ToastContainer
            position="bottom-right"
            autoClose={300}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="dark"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
