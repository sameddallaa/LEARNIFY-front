function InputBox({ children, type, bool }) {
  return (
    <label className="daisy-input daisy-input-bordered flex max-w-full items-center gap-2 bg-inherit">
      <input type={type} className="daisy-grow" placeholder={children} />
    </label>
  );
}

export default InputBox;
