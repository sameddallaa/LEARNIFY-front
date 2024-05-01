function Login2() {
  return (
    <div className="absolute z-10 rounded-md bg-blue-300 p-4 shadow-md">
      <form>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block font-semibold text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email adresse"
            className="my-2 w-40 rounded-full p-1  transition-all duration-300 placeholder:text-stone-400 focus:w-48"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="mb-2 block font-semibold text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="mb-2 w-40 rounded-full p-1  transition-all duration-300 placeholder:text-stone-400 focus:w-48"
          />
        </div>
        <button
          type="submit"
          className="inline-block rounded-full bg-indigo-500 px-4 py-2 font-semibold uppercase text-stone-800 transition-colors duration-300 hover:bg-cyan-400 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit!
        </button>
      </form>
    </div>
  );
}

export default Login2;
