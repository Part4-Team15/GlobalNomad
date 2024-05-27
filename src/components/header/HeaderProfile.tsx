import getUserInfo from '@/api/getUserInfo';
import { useQuery } from '@tanstack/react-query';
import HeaderProfileImage from './HeaderProfileImage';

const HeaderProfile = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: getUserInfo,
  });

  console.log(data);
  if (isLoading) {
    return <div>프로필을 불러오고 있습니다</div>;
  }

  if (isError || !data) {
    return <div>프로필을 불러오는데 실패했습니다</div>;
  }

  return (
    <div>
      <HeaderProfileImage
        nickname={data.nickname}
        profileImageUrl={data.profileImageUrl}
      />
      <div>{data?.email}</div>
    </div>
  );
};

export default HeaderProfile;
