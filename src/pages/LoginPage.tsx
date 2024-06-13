import React from 'react';
import AuthLayout from '@/components/common/auth/AuthLayout';
import LoginForm from '../components/login/LoginForm';
import LinkToSignupPage from '../components/login/LinkToSignupPage';

const LoginPage = () => (
  <AuthLayout>
    <LoginForm />
    <LinkToSignupPage />
  </AuthLayout>
);

export default LoginPage;
