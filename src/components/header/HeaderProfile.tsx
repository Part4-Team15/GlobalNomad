import getUserInfo from '@/api/getUserInfo';
import { useQuery } from '@tanstack/react-query';
import HeaderProfileImage from './HeaderProfileImage';

const HeaderProfile = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: getUserInfo,
  });

  if (isLoading) {
    return <div>프로필을 불러오고 있습니다</div>;
  }

  if (isError || !data) {
    return <div>프로필을 불러오는데 실패했습니다</div>;
  }

  return (
    <div className="flex gap-[10px] items-center">
      <HeaderProfileImage
        nickname={data.nickname}
        profileImageUrl={data.profileImageUrl}
      />

      <div className="text-sm">{data?.nickname}</div>
    </div>
  );
};

export default HeaderProfile;
