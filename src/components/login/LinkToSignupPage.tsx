import { Link } from 'react-router-dom';

const LinkToSignupPage = () => (
  <div className="flex mx-auto my-0 w-[640px] items-center justify-center gap-2 font-normal mt-8 sm:w-[350px]">
    <div className="text-[#4B4B4B]">회원이 아니신가요?</div>
    <Link to="/signup" className="text-green-80 underline underline-offset-2">
      회원가입하기
    </Link>
  </div>
);

export default LinkToSignupPage;
