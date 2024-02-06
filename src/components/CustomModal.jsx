import { Modal } from "antd";
import PropTypes from "prop-types";

const CustomModal = ({ open, hideModal, performAction, title }) => {
  return (
    <Modal
      title="Confirm!"
      open={open}
      onOk={performAction}
      onCancel={hideModal}
      okText="OK"
      cancelText="Cancel"
    >
      <p>{title}</p>
    </Modal>
  );
};

CustomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  hideModal: PropTypes.func,
  performAction: PropTypes.func,
  title: PropTypes.string,
};

export default CustomModal;
