import { Link } from 'react-router-dom';

const AuthLinkBox = () => (
  <div className="flex gap-[25px] text-[14px] font-medium text-[#1B1B1B]">
    <Link to="/login">로그인</Link>
    <Link to="/signup">회원가입</Link>
  </div>
);

export default AuthLinkBox;
