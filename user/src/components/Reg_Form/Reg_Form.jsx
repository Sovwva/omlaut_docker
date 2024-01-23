import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Reg_Form.css"; // Подключаем CSS файл
import { BaseUrlUser } from "../../config";
import { Navigate } from "react-router-dom";
import axios from "axios";

function Reg_Form() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      const RegData = {
        email: data.email,
        username: data.username,
        password: data.password,
      };

      console.log("SERVER_HOST:", process.env.SERVER_HOST);
      const RegResponse = await axios.post(
        `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/user/create`,
        RegData
      );

      if (RegResponse.status === 200) {
        console.log("Registration successful");
        // Добавьте навигацию после успешной регистрации
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
    </div>
  );
}

export default Reg_Form;
