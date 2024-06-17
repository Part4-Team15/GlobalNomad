import AuthLayout from '@/components/common/auth/AuthLayout';
import LinkToLoginPage from '../components/signup/LinkToLoginPage';
import SignupForm from '../components/signup/SignupForm';

const SignupPage = () => (
  <AuthLayout>
    <SignupForm />
    <LinkToLoginPage />
  </AuthLayout>
);

export default SignupPage;
