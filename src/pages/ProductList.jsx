import { Table, Tag } from "antd";
import { toast } from "react-toastify";
import { RiEdit2Line } from "react-icons/ri";

import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import CustomModal from "../components/CustomModal";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAProduct,
  getAllProducts,
} from "../features/product/productSlice";
// Imports End

const columns = [
  {
    title: "Sr No.",
    dataIndex: "key",
    sorter: (a, b) => a.key - b.key,
    // width: 100,
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.localeCompare(b.title),
    width: 300,
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
    title: "Tags",
    dataIndex: "tags",
    sorter: (a, b) => a.tags.localeCompare(b.tags),
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Sale Price",
    dataIndex: "salePrice",
    render: (text) => (
      <Tag color="red" style={{ fontSize: "16px" }}>{`${text}`}</Tag>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products);

  const data = productState.map((product, i) => ({
    key: i + 1,
    title: product.title,
    brand: product.brand,
    category: product.category,
    tags: product.tags,
    color: product.color,
    price: `Rs. ${product.price}`,
    salePrice: `Rs. ${product.salePrice || product.price}`,

    action: (
      <div className="d-flex">
        <EditButton to={`/dashboard/product/${product._id}`} />
        <DeleteButton onClick={() => showModal(product._id)} />
      </div>
    ),
  }));

  // Delete A Product
  const showModal = (id) => {
    setOpen(true);
    setProductId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const deleteProduct = async (id) => {
    try {
      dispatch(deleteAProduct(id));
      toast.success("Product deleted successfully!");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to delete Product.");
    }
    setTimeout(() => {
      dispatch(getAllProducts());
    }, 100);
  };

  return (
    <>
      {/* Page Title & Add Button */}
      <div className="d-flex justify-content-between align-items-center my-2 mb-3">
        <h3 className="page-title">Product List</h3>
        <Link
          to={"/dashboard/product"}
          className="button rounded-1 d-flex gap-1"
          style={{ padding: "10px" }}
        >
          <RiEdit2Line fontSize={20} />
          <span>Add Product</span>
        </Link>
      </div>
      {/* Page Title & Add Button End*/}

      {/* Table */}
      <div className="table-container">
        <Table columns={columns} dataSource={data} />
      </div>
      {/* Table End */}

      {/* Delete Modal */}
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => deleteProduct(productId)}
        title="Are you sure you want to delete this Product?"
      />
    </>
  );
};

export default ProductList;
