import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(userInput);

      navigate("/login", { replace: true });
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <div className="w-screen h-screen  bg-[#1d3557]  flex flex-col items-center">
      <p className="text-white text-6xl mb-10 mt-10">Register</p>
      <form
        className="bg-[#1d3557] w-[50%] border-2 border-indigo-500 shadow-md rounded px-8 pt-8 pb-12 mb-4"
        onSubmit={handleSubmit}
      >
        {error && <p className="text-xl text-red-600">{error}</p>}
        <div className="mb-4">
          <label
            className="block text-white text-lg font-bold mb-3"
            htmlFor="username"
          >
            Username{" "}
          </label>
          <input
            className="shadow bg-[#1d3557] appearance-none text-white border border-indigo-500 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            value={userInput.username}
            name="username"
            id="username"
            onChange={handleChange}
            type="text"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-lg font-bold mb-3"
            htmlFor="password"
          >
            Password{" "}
          </label>
          <input
            className="shadow bg-[#1d3557] appearance-none text-white border border-indigo-500 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            value={userInput.password}
            name="password"
            id="password"
            onChange={handleChange}
            type="password"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-lg font-bold mb-3"
            htmlFor="confirmPassword"
          >
            Confirm Password{" "}
          </label>
          <input
            className="shadow bg-[#1d3557] appearance-none text-white border border-indigo-500 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            value={userInput.confirmPassword}
            name="confirmPassword"
            id="confirmPassword"
            onChange={handleChange}
            type="password"
            required
          />
        </div>
        <div className="flex items-center justify-center mt-8">
          <button
            className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
          <Link
            to="/login"
            className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
