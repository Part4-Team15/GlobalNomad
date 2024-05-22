import PageMenu from './PageMenu';
import profileImage from './profileTestImage.svg';
import penIcon from '../../assets/pen_icon.svg';
import accountCheckIcon from '../../assets/account_check_icon.svg';
import accountCheckIconGray from '../../assets/account_check_icon_gray.svg';
import reservationIcon from '../../assets/textbox_check_icon.svg';
import reservationIconGray from '../../assets/textbox_check_icon_gray.svg';
import settingIcon from '../../assets/setting_icon.svg';
import settingIconGray from '../../assets/setting_icon_gray.svg';
import calendarIcon from '../../assets/calendar_check_icon.svg';
import calendarIconGray from '../../assets/calendar_check_icon_gray.svg';

const Profile = () => (
  // 여기에서 profileImage에 api에서 받아온 프로필을 설정할 수 있음
  <div className="flex w-96 p-6 flex-col justify-center items-start gap-6 border rounded-xl border-gray-50 bg-white shadow-md">
    <div className="flex justify-center items-start gap-[227px] self-stretch">
      <div className="flex flex-col justify-center items-center gap-6">
        <div
          className="relative w-40 h-40 shrink-0 rounded-full shadow-md bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${profileImage})`, backgroundColor: '#E3E5E8' }}
        >
          <div
            className="absolute p-[10px] w-11 h-11 inline-flex items-start bottom-0 right-3 z-10 rounded-full"
            style={{ backgroundColor: '#0B3B2D' }}
          >
            <img className="w-6 h-6" src={penIcon} alt="penIcon" />
          </div>
        </div>
      </div>
    </div>

    <div className=" flex flex-col items-start gap-2 self-stretch">
      <PageMenu linkTo="/my-page" icon={accountCheckIconGray} activeIcon={accountCheckIcon} name="내 정보" />
      <PageMenu linkTo="/reservations" icon={reservationIconGray} activeIcon={reservationIcon} name="예약 내역" />
      <PageMenu linkTo="/my-activity" icon={settingIconGray} activeIcon={settingIcon} name="내 체험 관리" />
      <PageMenu linkTo="/reserve-status" icon={calendarIconGray} activeIcon={calendarIcon} name="예약 현황" />
    </div>
  </div>
);
export default Profile;
