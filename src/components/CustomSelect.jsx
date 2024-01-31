import { Select } from "antd";
import PropTypes from "prop-types";

const CustomSelect = ({
  mode,
  placeholder,
  id,
  name,
  value,
  onChange,
  onBlur,
  defaultValue,
  options,
  children,
}) => {
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <>
      <Select
        allowClear
        showSearch
        mode={mode}
        optionFilterProp="children"
        filterOption={filterOption}
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        defaultValue={defaultValue}
        options={options}
        style={{ height: "56px", width: "100%" }}
      >
        {children}
      </Select>
    </>
  );
};
CustomSelect.propTypes = {
  mode: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  defaultValue: PropTypes.array,
  options: PropTypes.array,
  children: PropTypes.node,
};

export default CustomSelect;
