import { PiTrashSimple } from "react-icons/pi";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const DeleteButton = ({ to }) => {
  return (
    <Link
      to={to}
      className="ms-3 border border-danger rounded-2"
      style={{ color: "#CC0000", padding: "4px 6px" }}
    >
      <PiTrashSimple fontSize={18} />
    </Link>
  );
};

DeleteButton.propTypes = {
  to: PropTypes.string,
};

export default DeleteButton;
