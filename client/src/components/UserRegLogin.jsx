import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createNewUser, loginUser } from "../services/user.services.js";
export const UserRegLoginForm = () => {
  const navigate = useNavigate();
  const [registerUser, setRegisterUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [userErrors, setUserErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const updateUserData = (e) => {
    const { name, value } = e.target;
    setRegisterUser((prev) => ({ ...prev, [name]: value }));
  };

  const submitRegisterHandler = (e) => {
    e.preventDefault();
    createNewUser(registerUser)
      .then(() =>
        setRegisterUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        })
      )
      .then(() => navigate("/"))
      .catch((error) => setUserErrors(error.response.data.errors));
  };

  const updateCredentials = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const submitLoginHandler = (e) => {
    e.preventDefault();
    if (credentials.email === "" || credentials.password === "") return;
    loginUser(credentials)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          navigate("/coffee");
        }
      })
      .then(() =>
        setCredentials({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        })
      )
      .catch((error) => setUserErrors(error.response.data.errors));
  };

  return (
    <>
      <div className="header">
        <header>
          <h1>Welcome to BrewSpot</h1>
          <h2>Please register and login</h2>
        </header>
      </div>
      <div className="container1">
        <form onSubmit={submitRegisterHandler} className="register">
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={registerUser.firstName}
              onInput={updateUserData}
            />
            <p>{userErrors.firstName?.message}</p>
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={registerUser.lastName}
              onInput={updateUserData}
            />
            <p>{userErrors.lastName?.message}</p>
          </label>
          <label>
            Email:
            <input
              type="text"
              name="email"
              placeholder="email@example.com"
              value={registerUser.email}
              onInput={updateUserData}
            />
            <p>{userErrors.email?.message}</p>
          </label>
          <label>
            Password:
            <input
              type="*"
              name="password"
              placeholder="Password"
              value={registerUser.password}
              onInput={updateUserData}
            />
            <p>{userErrors.password?.message}</p>
          </label>
          <label>
            Confirm Password:
            <input
              type="*"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={registerUser.confirmPassword}
              onInput={updateUserData}
            />
            <p>{userErrors.confirmPassword?.message}</p>
          </label>
          <input className="registerButton" type="submit" value="Register" />
        </form>

        <form onSubmit={submitLoginHandler} className="login">
          <label>
            Email:
            <input
              type="text"
              name="email"
              placeholder="email@example.com"
              value={credentials.email}
              onInput={updateCredentials}
            />
          </label>
          <p>{userErrors.email?.message}</p>
          <label>
            Password:
            <input
              type="*"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onInput={updateCredentials}
            />
          </label>
          <input className="loginButton" type="submit" value="Login" />
        </form>
      </div>
      <footer className="footer"></footer>
    </>
  );
};
