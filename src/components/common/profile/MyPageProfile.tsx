import { useLocation } from 'react-router-dom';
import { MyPageProfileProps } from '@/types/myPageProfile';
import useUserInfoQuery from '@/hooks/useUserInfoQuery';
import PageMenu from './PageMenu';
import ProfileImage from './ProfileImage';

const MyPageProfile = ({
  uploadedImage = null,
  setUploadedImage,
  isShowProfileForm,
  setIsShowProfileForm,
  isShowDefaultImage,
  setIsShowDefaultImage,
}: MyPageProfileProps) => {
  const location = useLocation();
  const isPathNameMyProfile = location.pathname === '/my/profile';
  const isShowProfile = isPathNameMyProfile && !isShowProfileForm;

  const { userInfo, isLoading, isError } = useUserInfoQuery();

  if (isLoading) {
    return <div>프로필을 불러오고 있습니다</div>;
  }

  if (isError || !userInfo) {
    return <div>프로필을 불러오는데 실패했습니다</div>;
  }

  return (
    <div
      className={`flex ${isShowProfile ? '' : 'sm:hidden'} md:w-[251px] lg:w-96 p-6 flex-col justify-center items-start gap-6 border rounded-xl border-gray-50 bg-white shadow-md self-start`}
    >
      <div className="flex justify-center items-start gap-[227px] self-stretch">
        <div className="flex flex-col justify-center items-center gap-6">
          <ProfileImage
            nickname={userInfo.nickname}
            profileImageUrl={userInfo.profileImageUrl}
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
            isShowDefaultImage={isShowDefaultImage}
            setIsShowDefaultImage={setIsShowDefaultImage}
          />
        </div>
      </div>

      <div className=" flex flex-col items-start gap-2 self-stretch">
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
      </div>
    </div>
  );
};
export default MyPageProfile;
