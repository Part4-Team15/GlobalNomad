import { Link, useNavigate } from 'react-router-dom';
import HeaderProfile from './HeaderProfile';
import Notification from './Notification';

const Header = () => {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const isLogin = accessToken && refreshToken;

  return (
    <div className="flex py-[19px] justify-around md:px-[24px] md:justify-between items-center">
      <img
        className="cursor-pointer"
        src="/assets/logo_small.svg"
        alt="logo_small_icon"
        onClick={() => navigate('/')}
      />
      {!isLogin ? (
        <div className="flex gap-[25px] text-[14px] font-medium text-[#1B1B1B]">
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </div>
      ) : (
        <div className="flex items-center gap-[25px] sm:gap-[12px] relative">
          <Notification />
          <img src="/assets/header_bar_icon.svg" alt="header_bar_icon" />
          <HeaderProfile />
        </div>
      )}
    </div>
  );
};

export default Header;
