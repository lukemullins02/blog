import api from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

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
      await api.post("/register", userInput);

      navigate("/login", { replace: true });
    } catch (err) {
      if (err.response) {
        console.log(`Error: ${err.response.data.message}`);
      } else {
        console.log("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username </label>
        <input
          value={userInput.username}
          name="username"
          id="username"
          onChange={handleChange}
          type="text"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password </label>
        <input
          value={userInput.password}
          name="password"
          id="password"
          onChange={handleChange}
          type="password"
          required
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password </label>
        <input
          value={userInput.confirmPassword}
          name="confirmPassword"
          id="confirmPassword"
          onChange={handleChange}
          type="password"
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
