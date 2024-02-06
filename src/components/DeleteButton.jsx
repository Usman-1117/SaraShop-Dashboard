import { PiTrashSimple } from "react-icons/pi";
import PropTypes from "prop-types";

const DeleteButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="ms-3 border border-danger rounded-2 bg-transparent"
      style={{ color: "#CC0000", padding: "4px 6px" }}
    >
      <PiTrashSimple fontSize={18} />
    </button>
  );
};

DeleteButton.propTypes = {
  onClick: PropTypes.func,
};

export default DeleteButton;
