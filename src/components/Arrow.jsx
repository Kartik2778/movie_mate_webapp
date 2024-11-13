

const Arrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, background: "red" }}
      onClick={onClick}
    />
  );
};


export default Arrow;