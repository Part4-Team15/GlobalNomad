import { Link } from 'react-router-dom';
import AuthLinkBox from './AuthLinkBox';
import HeaderUserInformation from './HeaderUserInformation';

const Header = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const isLogin = accessToken && refreshToken;

  return (
    <div className="flex h-[70px] justify-around sm:px-[24px] sm:justify-between md:px-[24px] md:justify-between items-center">
      <Link to="/">
        <img className="cursor-pointer" src="/assets/logo_small.svg" alt="header_logo" />
      </Link>
      {!isLogin ? <AuthLinkBox /> : <HeaderUserInformation />}
    </div>
  );
};

export default Header;
