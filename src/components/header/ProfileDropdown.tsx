import { useNavigate } from 'react-router-dom';
import PageMenu from '../common/profile/PageMenu';

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <div className="flex flex-col gap-3 absolute top-12 right-0 z-20 w-56 rounded-md bg-white shadow-md border-1 p-3">
      <PageMenu
        linkTo="my/profile"
        icon="/assets/account_check_icon_gray.svg"
        activeIcon="/assets/account_check_icon.svg"
        name="내 정보"
      />
      <PageMenu
        linkTo="/my/reservation-history"
        icon="/assets/textbox_check_icon_gray.svg"
        activeIcon="/assets/textbox_check_icon.svg"
        name="예약 내역"
      />
      <PageMenu
        linkTo="/my/activity"
        icon="/assets/setting_icon_gray.svg"
        activeIcon="/assets/setting_icon.svg"
        name="내 체험 관리"
      />
      <PageMenu
        linkTo="/my/reservation-status"
        icon="/assets/calendar_check_icon_gray.svg"
        activeIcon="/assets/calendar_check_icon.svg"
        name="예약 현황"
      />
      <div
        className="text-center p-3 bg-green-80 text-white rounded-xl font-semibold hover:bg-green-10 hover:text-green-80"
        onClick={logout}
      >
        로그아웃
      </div>
    </div>
  );
};

export default ProfileDropdown;
