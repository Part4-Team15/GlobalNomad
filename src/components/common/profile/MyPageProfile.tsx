import { useQuery } from '@tanstack/react-query';
import getUserInfo from '@/api/getUserInfo';
import queryKeys from '@/api/reactQuery/queryKeys';
import { useLocation } from 'react-router-dom';
import PageMenu from './PageMenu';
import ProfileImage from './ProfileImage';

const MyPageProfile = ({
  uploadedImage = null,
  setUploadedImage,
  setIsMyProfilePage,
  isMyProfilePage,
}: {
  uploadedImage?: string | null;
  setUploadedImage?: React.Dispatch<React.SetStateAction<string | null>>;
  setIsMyProfilePage: React.Dispatch<React.SetStateAction<boolean>>;
  isMyProfilePage: boolean;
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.user(),
    queryFn: getUserInfo,
  });
  const location = useLocation();
  if (isLoading) {
    return <div>프로필을 불러오고 있습니다</div>;
  }

  if (isError || !data) {
    return <div>프로필을 불러오는데 실패했습니다</div>;
  }
  const isProfilePage = location.pathname === '/my/profile';
  if (isProfilePage) {
    return (
      <div
        className={`flex ${isMyProfilePage ? 'sm:hidden' : ''} md:w-[251px] lg:w-96 p-6 flex-col justify-center items-start gap-6 border rounded-xl border-gray-50 bg-white shadow-md self-start w-[384px]`}
      >
        <div className="flex justify-center items-start gap-[227px] self-stretch">
          <div className="flex flex-col justify-center items-center gap-6">
            <ProfileImage
              nickname={data.nickname}
              profileImageUrl={data.profileImageUrl}
              uploadedImage={uploadedImage}
              setUploadedImage={setUploadedImage}
            />
          </div>
        </div>

        <div className=" flex flex-col items-start gap-2 self-stretch">
          <PageMenu
            linkTo="/my/profile"
            icon="/assets/account_check_icon_gray.svg"
            activeIcon="/assets/account_check_icon.svg"
            name="내 정보"
            setIsMyProfilePage={setIsMyProfilePage}
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
  }
  return (
    <div className="flex sm:hidden md:w-[251px] lg:w-96 p-6 flex-col justify-center items-start gap-6 border rounded-xl border-gray-50 bg-white shadow-md self-start w-[384px]">
      <div className="flex justify-center items-start gap-[227px] self-stretch">
        <div className="flex flex-col justify-center items-center gap-6">
          <ProfileImage
            nickname={data.nickname}
            profileImageUrl={data.profileImageUrl}
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
          />
        </div>
      </div>

      <div className=" flex flex-col items-start gap-2 self-stretch">
        <PageMenu
          linkTo="/my/profile"
          icon="/assets/account_check_icon_gray.svg"
          activeIcon="/assets/account_check_icon.svg"
          name="내 정보"
          setIsMyProfilePage={setIsMyProfilePage}
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
