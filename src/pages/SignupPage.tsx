import LinkToLoginPage from '../components/signup/LinkToLoginPage';
import SignupForm from '../components/signup/SignupForm';

const SignupPage = () => (
  <div>
    <img
      src="/assets/logo.svg"
      alt="logo"
      className="ml-auto mr-auto mt-[104px] mb-[40px]"
    />
    <SignupForm />
    <LinkToLoginPage />
  </div>
);

export default SignupPage;
