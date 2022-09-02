import { useFormik } from "formik";
import React from "react";
import styled from "styled-components";
import Button from "../../atoms/button";
import Input from "../../atoms/input";

const AuthForm = ({ handleLogin, handleRegister }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLogin,
  });
  return (
    <AuthFormContainerStyled onSubmit={formik.handleSubmit}>
      <Input
        type="email"
        placeholder="email"
        data-testid="email"
        {...formik.getFieldProps("email")}
      />
      <Input
        type="password"
        placeholder="password"
        data-testid="password"
        {...formik.getFieldProps("password")}
      />
      <AuthFormButtonWrapperStyled>
        <Button type="submit">Login</Button>
        <Button type="button" onClick={() => handleRegister(formik.values)}>
          Register
        </Button>
      </AuthFormButtonWrapperStyled>
    </AuthFormContainerStyled>
  );
};

const AuthFormContainerStyled = styled.form`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;
const AuthFormButtonWrapperStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export default AuthForm;
