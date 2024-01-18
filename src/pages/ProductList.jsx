import { Empty, Table } from "antd";

import { Link } from "react-router-dom";
// Icons
import { FaRegEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../features/product/productSlice";

const columns = [
  {
    title: "Sr No.",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.localeCompare(b.brand),
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.localeCompare(b.category),
  },
  {
    title: "Color",
    dataIndex: "color",
    sorter: (a, b) => a.color.localeCompare(b.color),
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price.localeCompare(b.price),
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ProductList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products);

  const data = productState.map((product, index) => ({
    key: index + 1,
    title: product.title,
    brand: product.brand,
    category: product.category,
    color: product.color,
    price: `$ ${product.price}`,
    action: (
      <>
        <Link to="/" className="fs-5 text-primary">
          <FaRegEdit />
        </Link>

        <Link to="/" className="ms-4 fs-5 " style={{ color: "#CC0000" }}>
          <FaTrashCan />
        </Link>
      </>
    ),
  }));

  return (
    <div>
      <h3 className="page-title mb-4">Product List</h3>
      {productState.length > 0 ? (
        <div className="table-container">
          <Table columns={columns} dataSource={data} />
        </div>
      ) : (
        <Empty description="No data available" />
      )}
    </div>
  );
};

export default ProductList;
