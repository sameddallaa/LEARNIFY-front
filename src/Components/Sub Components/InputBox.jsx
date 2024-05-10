function InputBox({ children, type, setValue }) {
  return (
    <label
      className={`daisy-input daisy-input-bordered flex max-w-full items-center gap-2 bg-inherit`}
    >
      <input
        type={type}
        className={`daisy-grow`}
        placeholder={children}
        onChange={(e) => {
          setValue(e.target.value);
          // console.log(e.target.value);
        }}
      />
    </label>
  );
}

export default InputBox;
