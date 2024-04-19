import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const EditButton = ({ to }) => {
  return (
    <Link
      to={to}
      className="text-primary border border-2 rounded-2"
      style={{ padding: "4px 6px" }}
    >
      <AiOutlineEdit fontSize={22} />
    </Link>
  );
};

EditButton.propTypes = {
  to: PropTypes.string,
};

export default EditButton;
