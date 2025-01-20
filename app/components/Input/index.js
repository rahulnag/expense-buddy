import styles from "./page.module.css";
const Input = ({
  type = "text", // Default type is "text"
  name = "", // Name for the input field
  value = "", //value of the input field
  placeholder = "", // Placeholder text
  onChange = "", // Optional custom onChange handler
  required = false, // If the field is required
  ...rest // Spread operator for additional props
}) => {
  // // Internal onChange handler
  // const handleInputChange = (event) => {
  //   const newValue = event.target.value;
  //   setValue(newValue);

  //   // Call the parent-provided onChange, if exists
  //   if (onChange) {
  //     onChange(event);
  //   }
  // };
  return (
    <input
      type={type}
      value={value}
      required={required}
      placeholder={placeholder}
      onChange={onChange}
      className={styles["input-box"]}
      {...rest}
    />
  );
};

export default Input;
