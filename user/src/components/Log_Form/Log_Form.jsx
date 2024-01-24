import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Log_Form.css";
import { BaseUrlUser } from "../../config";
import axios from "axios";

function Log_Form() {
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const LogData = {
        login: data.login,
        password: data.password,
      };

      const loginResponse = await axios
        .post(BaseUrlUser + "user/login", LogData)
        .then((response) => {
          if (response.status === 200) {
            window.location.reload();
            <Navigate to={"/"} />;
          } else {
            setError(response.request);
            console.error(error);
          }
          const accessToken = loginResponse.data.accessToken;
          localStorage.setItem("accessToken", accessToken);
          setIsLoggedIn(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoggedIn) {
    window.location.reload();
    return <Navigate to={"/"} />;
  }

  return (
    <div className="input_form">
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Email
          <input type="email" {...register("login", { required: true })} />
          <div className="error">{errors?.login && <p>Error!</p>}</div>
        </label>
        <label>
          Password
          <input
            type="password"
            {...register("password", { required: true })}
          />
          <div className="error">{errors?.password && <p>Error!</p>}</div>
        </label>
        <input type="submit" value="Login" />
      </form>
      <Link to="/Registration" className="no-underline">
        Don't have an account? Sign up
      </Link>
    </div>
  );
}

export default Log_Form;
