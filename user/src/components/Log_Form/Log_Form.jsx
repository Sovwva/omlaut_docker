import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./Log_Form.css";
import axios from "axios";

function Log_Form() {
  const [error, setError] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const LogData = {
        username: data.username,
        password: data.password,
      };

      const LogResponse = await axios.post(
        `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/user/login`,
         LogData
        );

      if (LogResponse.status === 200) {
        const accessToken = LogResponse.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        window.location.href = "/";
      } else {
        setError(LogResponse.request);
      }
    } catch (error) {
      console.log(error);
      setError("An error occured during login")
    }
  };

  return (
    <div className="input_form">
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username
          <input type="text" {...register("username", { required: true })} />
          <div className="error">{errors?.username && <p>Error!</p>}</div>
        </label>
        <label>
          Password
          <input type="password" {...register("password", { required: true })} />
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
