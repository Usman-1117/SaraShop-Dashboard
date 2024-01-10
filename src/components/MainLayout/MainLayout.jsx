import "./MainLayout.scss";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import userProfile from "../../assets/user.jpg";

// React Icons
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { TbBrandStripe, TbZoomInArea } from "react-icons/tb";
import { BiCategory, BiSolidColorFill } from "react-icons/bi";
import { FaBloggerB } from "react-icons/fa6";
import { IoBagAddOutline, IoLogoStencil } from "react-icons/io5";
import {
  MdOutlineProductionQuantityLimits,
  MdFormatListBulletedAdd,
  MdAddToQueue,
  MdNotificationsActive,
} from "react-icons/md";

// Ant Design Imports
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout className="min-vh-100">
      {/* Side Menu */}
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
          onClick={({ key }) => {
            if (key == "signout") {
              /* empty */
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <AiOutlineUser className="fs-4" />,
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
              icon: <MdFormatListBulletedAdd className="fs-4" />,
              label: "Orders",
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
          ]}
        />
      </Sider>
      {/* Side Menu ENd*/}

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

          {/* User Info Side */}
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
          {/* User Info Side End*/}
        </Header>
        <Content
          style={{
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
