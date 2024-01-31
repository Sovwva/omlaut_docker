import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Reg_Form.css"; // Подключаем CSS файл
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Reg_Form() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const error = useState(null);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const RegData = {
        email: data.email,
        username: data.username,
        password: data.password,
      };

      const RegResponse = await axios.post(
        `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/user/create`,
        RegData
      );

      if (RegResponse.status === 200) {
        console.log("Registration successful");
        navigate("/login")
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="input_form">
      <h2>Registration</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Email
          <input type="email" {...register("email", { required: true })} />
          <div className="error">{errors?.login && <p>Error!</p>}</div>
        </label>
        <label>
          Username
          <input type="text" {...register("username", { required: true })} />
          <div className="error">{errors?.username && <p>Error!</p>}</div>
        </label>
        <label>
          Password
          <input
            type="password"
            {...register("password", { required: true })}
          />
          <div className="error">{errors?.password && <p>Error!</p>}</div>
        </label>
        <input type="submit" />
      </form>
      <Link to="/Login" className="no-underline">
        Already have an account? Sign in
      </Link>
    </div>
  );
}

export default Reg_Form;
