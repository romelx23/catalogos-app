import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";

export const FormLogin = () => {
  const { values, handleInputChange } = useForm({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    console.log(values);
    await login(values.email, values.password);
  };
  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-shrink-0 flex-col gap-4 text-white w-full max-w-sm"
      >
        <h1 className="text-center font-semibold text-xl">
          Formulario de Ingreso
        </h1>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={values.email}
            onChange={handleInputChange}
            className="bg-gray-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full max-w-lg md:w-[350px]"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={values.password}
            onChange={handleInputChange}
            className="bg-gray-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full max-w-lg md:w-[350px]"
          />
        </div>
        <button
          disabled={values.email.length === 0 || values.password.length === 0}
          type="submit"
          className="bg-blue-500 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full max-w-lg md:w-[350px] mt-4"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};
