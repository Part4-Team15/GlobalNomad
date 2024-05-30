import { Link, useLocation } from 'react-router-dom';
import HeaderProfile from './HeaderProfile';

const Header = () => {
  const location = useLocation();

  return (
    <div className="flex py-[19px] justify-around md:px-[24px] md:justify-between items-center">
      <img src="assets/logo_small.svg" alt="logo_small_icon" />
      {location.pathname === '/' ? (
        <div className="flex gap-[25px] text-[14px] font-medium text-[#1B1B1B]">
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </div>
      ) : (
        <div className="flex gap-[25px] sm:gap-[12px]">
          <img src="assets/notification_icon.svg" alt="notification_icon" />
          <img src="assets/header_bar_icon.svg" alt="header_bar_icon" />
          <HeaderProfile />
        </div>
      )}
    </div>
  );
};

export default Header;
