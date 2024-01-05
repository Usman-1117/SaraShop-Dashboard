import "./MainLayout.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// React Icons
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { TbBrandStripe, TbZoomInArea } from "react-icons/tb";
import { BiCategory, BiSolidColorFill } from "react-icons/bi";
import { FaBloggerB } from "react-icons/fa6";
import { IoBagAddOutline } from "react-icons/io5";
import {
  MdOutlineProductionQuantityLimits,
  MdFormatListBulletedAdd,
  MdAddToQueue,
} from "react-icons/md";

// Ant Design Imports
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout className="min-vh-100">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical py-3 text-white text-center">SaraShop</div>
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
              icon: <AiOutlineDashboard className="fs-5" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <AiOutlineUser className="fs-5" />,
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <MdOutlineProductionQuantityLimits className="fs-5" />,
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
              icon: <MdFormatListBulletedAdd className="fs-5" />,
              label: "Orders",
            },
            {
              key: "blogs",
              icon: <FaBloggerB className="fs-5" />,
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
              key: "enquires",
              icon: <TbZoomInArea className="fs-5" />,
              label: "Enquires",
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
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
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
