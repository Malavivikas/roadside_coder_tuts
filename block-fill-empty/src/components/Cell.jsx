// eslint-disable-next-line react/prop-types
const Cell = ({ onClick, filled, isDisabled }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={filled ? "cell cell-activated" : "cell"}
    ></button>
  );
};

export default Cell;
