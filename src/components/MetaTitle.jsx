import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

const MetaTitle = ({ title }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
    </Helmet>
  );
};

MetaTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MetaTitle;
