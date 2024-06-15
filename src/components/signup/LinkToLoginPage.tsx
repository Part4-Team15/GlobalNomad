import { Link } from 'react-router-dom';

const LinkToLoginPage = () => (
  <div className="flex mx-auto my-0 w-[640px] items-center justify-center gap-2 font-normal mt-8 sm:w-[350px]">
    <div className="text-[#4B4B4B]">회원이신가요?</div>
    <Link to="/login" className="text-green-80 underline underline-offset-2">
      로그인하기
    </Link>
  </div>
);

export default LinkToLoginPage;
