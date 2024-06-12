import { useQuery } from '@tanstack/react-query';
import getUserInfo from '@/api/getUserInfo';
import { UserInformation } from '@/types/header';

const useUserInfoQuery = () => {
  const { data, isLoading, isError } = useQuery<UserInformation>({
    queryKey: ['user'],
    queryFn: getUserInfo,
  });
  return { userInfo: data, isLoading, isError };
};

export default useUserInfoQuery;
