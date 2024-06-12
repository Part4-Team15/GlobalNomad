import { ReactNode } from 'react';

const AuthButton = ({ children }: { children: ReactNode }) => (
  <button
    type="submit"
    className="bg-gray-60  w-[40rem] rounded-[6px] px-[8.5rem] py-[0.875rem] text-white font-bold "
  >
    {children}
  </button>
);

export default AuthButton;
