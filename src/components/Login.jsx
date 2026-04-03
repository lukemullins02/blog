import { useState } from "react";
import { login } from "../services/authService";
import { useAuth } from "../provider/authProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
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
      const response = await login({ ...userInput });

      if (response.token) {
        setToken(response.token);
        navigate("/", { replace: true });
      }
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
        <label htmlFor="username">Username</label>
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
        <label htmlFor="password">Password</label>
        <input
          value={userInput.password}
          name="password"
          id="password"
          onChange={handleChange}
          type="password"
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Login;
