import getUserInfo from '@/api/getUserInfo';
import { useQuery } from '@tanstack/react-query';

const HeaderProfile = () => {
  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getUserInfo,
  });
  console.log(data);
  return <div>헤더 프로필</div>;
};

export default HeaderProfile;
