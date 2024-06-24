import { useQuery } from '@tanstack/react-query';
import getUserInfo from '@/api/getUserInfo';
import { UserInformation } from '@/types/header';
import queryKeys from '@/api/reactQuery/queryKeys';

const useUserInfoQuery = () => {
  const { data, isLoading, isError } = useQuery<UserInformation>({
    queryKey: queryKeys.user(),

    queryFn: getUserInfo,
    retry: false,
  });
  return { userInfo: data, isLoading, isError };
};

export default useUserInfoQuery;
