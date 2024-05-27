import HeaderProfile from './HeaderProfile';

const Header = () => (
  <div className="flex py-[19px]">
    <img src="assets/logo_small.svg" alt="logo_small_icon" />
    <div className="flex">
      <img src="assets/notification_icon.svg" alt="notification_icon" />
      <HeaderProfile />
    </div>
  </div>
);

export default Header;
