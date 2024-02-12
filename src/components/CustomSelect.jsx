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
  options,
  defaultValue,
}) => {
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
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
      style={{ height: "56px", width: "100%" }}
    >
      <Select.Option value="" label="Select Category" disabled>
        Select Category
      </Select.Option>

      {options.map((option) => (
        <Select.Option
          key={option.value}
          value={option.value}
          label={option.label}
        >
          {option.label}
        </Select.Option>
      ))}
    </Select>
  );
};

CustomSelect.propTypes = {
  mode: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.array,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    })
  ),
};

export default CustomSelect;
