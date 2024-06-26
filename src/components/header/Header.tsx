import AuthLinkBox from './AuthLinkBox';
import HeaderUserInformation from './HeaderUserInformation';
import HeaderLogo from './HeaderLogo';

const Header = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const isLogin = accessToken && refreshToken;

  return (
    <header className="flex h-[70px] justify-around sm:px-[24px] sm:justify-between md:px-[24px] md:justify-between items-center dark:bg-darkMode-black-20 [&_*]:dark:text-darkMode-white-10">
      <HeaderLogo />
      {!isLogin ? <AuthLinkBox /> : <HeaderUserInformation />}
    </header>
  );
};

export default Header;
