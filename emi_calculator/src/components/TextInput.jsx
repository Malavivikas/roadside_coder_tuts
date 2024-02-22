// eslint-disable-next-line react/prop-types
const TextInput = ({ title, state, setState }) => {
  return (
    <>
      <span className="title">{title}</span>
      <input
        type="number"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={title}
      />
    </>
  );
};

export default TextInput;
