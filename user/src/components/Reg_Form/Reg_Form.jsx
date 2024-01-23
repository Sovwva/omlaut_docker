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

      const RegResponse = await axios
        .post(
          process.env.SERVER_HOST + process.env.SERVER_PORT + "/user/create/",
          RegData
        )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            <Navigate to={"/login"} />;
          } else {
            console.error(error);
          }

          RegResponse();
        });
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
