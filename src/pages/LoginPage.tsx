import React from 'react';
import LoginForm from '../components/login/LoginForm';
import LinkToSignupPage from '../components/login/LinkToSignupPage';

const LoginPage = () => (
  <div>
    <img
      src="/assets/logo.svg"
      alt="logo"
      className="ml-auto mr-auto mt-[104px] mb-[40px]"
    />
    <LoginForm />
    <LinkToSignupPage />
  </div>
);

export default LoginPage;
