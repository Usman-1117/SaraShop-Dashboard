import { Result } from "antd";
import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Link to={"/dashboard"}>Back Home</Link>}
    />
  );
};

export default NoPage;
