import { useNavigate, useParams } from 'react-router-dom';
import deleteMyActivity from '@/api/deleteMyActivity';
import Toast from '@/utils/Toast';
import useActivityQuery from '@/hooks/useActivityQuery';
import useUserInfoQuery from '@/hooks/useUserInfoQuery';

import CustomKebabMenu from '../myActivity/CustomKebabMenu';

const Title = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: activity,
    isLoading: activityLoading,
    isError: activityError,
  } = useActivityQuery(id || '');

  const { userInfo, isLoading: userLoading, isError: userError } = useUserInfoQuery();

  const navigate = useNavigate();

  const handleDeleteActivity = async () => {
    try {
      await deleteMyActivity(String(id));
      navigate('/');
    } catch (error: any) {
      const errorMessage = error.toString();
      Toast.error(errorMessage);
    }
  };

  if (activityLoading || userLoading) {
    return <div>타이틀 정보를 불러오고 있습니다</div>;
  }

  if (activityError || userError || !activity || !userInfo) {
    return <div>타이틀 정보를 불러오는데 실패했습니다</div>;
  }

  const { userId, title, category, rating, address, reviewCount } = activity;

  return (
    <div className="flex flex-col w-full gap-2.5">
      <span className="text-gray-80 font-normal md:text-sm sm:text-sm">{category}</span>
      <h1 className="text-4xl font-bold md:text-3xl sm:text-2xl">{title}</h1>
      <div className="flex justify-between items-center md:text-sm sm:text-sm">
        <div className="flex gap-1">
          <div className="flex">
            <img className="w-4" src="/assets/star_on_icon.svg" alt="rating star" />
            {rating}({reviewCount})
          </div>
          <img src="/assets/location_icon.svg" alt="location icon" />
          <span className="text-gray-80">{address}</span>
        </div>
        {userInfo.id === userId && (
          <CustomKebabMenu
            options={[
              {
                label: '수정하기',
                onClick: () =>
                  navigate(`/my/activity/${id}/modify`, {
                    state: { ...activity },
                  }),
              },
              { label: '삭제하기', onClick: handleDeleteActivity },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default Title;
