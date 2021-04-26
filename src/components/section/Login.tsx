import React from "react";
import { useAppState } from "../../context/appContext";
import useFormHandler from "../../hooks/useFormHandler";
import ErrorAlert from "../elements/ErrorAlert";
import Input from "../elements/Input";
import Spinner from "../elements/Spinner";
import Title from "../elements/Title";

interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
  const { handleLogin, isLoading, errorMessage } = useAppState();
  const { name, email, handleChange } = useFormHandler({ name: "", email: "" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin(name, email);
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <Title pageTitle="Login to Account" />

      {errorMessage && (
        <div className="form-container">
          <ErrorAlert>{errorMessage}</ErrorAlert>
        </div>
      )}

      {isLoading && (
        <div className="d-flex justify-center items-center">
          <Spinner />
        </div>
      )}
      <div className="form-container">
        <Input
          type="email"
          label="Email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter email address"
          required
        />
      </div>
      <div className="form-container pt-16">
        <Input
          type="text"
          label="Name"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Enter name"
          required
        />
      </div>
      <div className="pt-16">
        <button className="btn btn-block btn-primary" type="submit">
          Login
        </button>
      </div>
    </form>
  );
};
