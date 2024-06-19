import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => (
  <div className="pt-[104px] md:pt-[72px] sm:pt-[44px] md:px-[52px] sm:px-[12px] mb-[405px] md:mb-[490px] sm:mb-[259px]">
    <img src="/assets/logo.svg" alt="logo" className="ml-auto mr-auto sm:w-[270px] sm:h-[154px]" />
    {children}
  </div>
);

export default AuthLayout;
