import { ProfileImageLayoutProps } from '@/types/myPageProfile';
import PageMenu from './PageMenu';

const ProfileImageLayout = ({
  children,
  isShowProfile,
  setIsShowProfileForm,
}: ProfileImageLayoutProps) => {
  return (
    <div
      className={`flex ${isShowProfile ? '' : 'sm:hidden'} md:w-[251px] w-96 p-6 flex-col justify-center items-start gap-6 border rounded-xl border-gray-50 bg-white shadow-md self-start dark:bg-darkMode-black-20 sm:mx-auto`}
    >
      <div className="flex justify-center items-start gap-[227px] self-stretch">
        <div className="flex flex-col justify-center items-center gap-6">{children}</div>
      </div>

      <ol className=" flex flex-col items-start gap-2 self-stretch">
        <PageMenu
          linkTo="/my/profile"
          icon="/assets/account_check_icon_gray.svg"
          activeIcon="/assets/account_check_icon.svg"
          name="내 정보"
          setIsShowProfileForm={setIsShowProfileForm}
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
      </ol>
    </div>
  );
};

export default ProfileImageLayout;
