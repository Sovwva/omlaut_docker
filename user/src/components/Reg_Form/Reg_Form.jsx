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
        login: data.login,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      };

      const RegResponse = await axios
        .post(BaseUrlUser + "user/create", RegData)
        .then((response) => {
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
        <label>
          First name
          <input type="text" {...register("firstName", { required: true })} />
          <div className="error">{errors?.firstname && <p>Error!</p>}</div>
        </label>
        <label>
          Last Name
          <input type="text" {...register("lastName", { required: true })} />
          <div className="error">{errors?.lastname && <p>Error!</p>}</div>
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}

export default Reg_Form;
