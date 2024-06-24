import { Link } from 'react-router-dom';

const LinkToLoginPage = () => (
  <div className="flex dark:bg-darkMode-black-10 my-0 items-center justify-center gap-2 font-normal pt-8 sm:w-[350px] w-[640px] mx-auto pb-[150px]">
    <div className="text-[#4B4B4B] dark:text-darkMode-white-30">회원이신가요?</div>
    <Link
      to="/login"
      className="text-green-80 underline underline-offset-2 dark:text-darkMode-gray-10"
    >
      로그인하기
    </Link>
  </div>
);

export default LinkToLoginPage;
