const Button = ({
  type = "primary",
  text = "",
  clickHandler = "",
  ...rest
}) => {
  return (
    <button onClick={clickHandler} {...rest}>
      {text}
    </button>
  );
};

export default Button;
