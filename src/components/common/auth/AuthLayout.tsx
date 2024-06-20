import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation(); // Changed navigate to location
  console.log(location.pathname); // Use location instead of navigate

  return (
    <div
      className={`pt-[104px] md:pt-[72px] sm:pt-[44px] md:px-[52px] sm:px-[12px] dark:bg-darkMode-black-10 ${location.pathname === '/login' ? 'h-screen' : 'h-full'}`}
    >
      <img
        src="/assets/logo.svg"
        alt="logo"
        className="ml-auto mr-auto sm:w-[270px] sm:h-[154px]"
      />
      {children}
    </div>
  );
};

export default AuthLayout;
