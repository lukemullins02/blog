import { useState } from "react";
import { login } from "../services/authService";

function Login() {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    login({ ...userInput });
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
          type="text"
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Login;
