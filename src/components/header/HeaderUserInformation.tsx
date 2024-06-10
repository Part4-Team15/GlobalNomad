import HeaderProfile from './HeaderProfile';
import Notification from './Notification';

const HeaderUserInformation = () => (
  <div className="flex items-center gap-[25px] sm:gap-[12px]">
    <Notification />
    <img src="/assets/header_bar_icon.svg" alt="header_bar_icon" />
    <HeaderProfile />
  </div>
);

export default HeaderUserInformation;
