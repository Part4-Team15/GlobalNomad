import { useNavigate } from 'react-router-dom';
import { ActivityType, SubImage } from '@/types/activityPage';
import deleteMyActivity from '@/api/deleteMyActivity';
import CustomKebabMenu from '../myActivity/CustomKebabMenu';

interface TopBannerProps {
  activity: ActivityType;
}

interface SubImagesBannerProps {
  subImages: SubImage[];
}

const SubImagesBanner: React.FC<SubImagesBannerProps> = ({ subImages }): JSX.Element => {
  const newSubImages = [];

  for (let index = 0; index < 4; index += 1) {
    if (subImages[index]) {
      newSubImages.push(
        <img
          className={`w-full h-[261px] object-cover ${index === 1 ? 'rounded-tr-xl' : ''} ${
            index === 3 ? 'rounded-br-xl' : ''
          }`}
          src={subImages[index].imageUrl}
          alt={`Sub Banner Img ${index + 1}`}
        />,
      );
    } else {
      newSubImages.push(
        <div
          className={`bg-green-80 w-full h-[261px] object-cover ${index === 1 ? 'rounded-tr-xl' : ''} ${
            index === 3 ? 'rounded-br-xl' : ''
          }`}
        />,
      );
    }
  }

  return <div className="w-1/2 grid grid-cols-2 gap-3">{newSubImages}</div>;
};

const TopBanner: React.FC<TopBannerProps> = ({ activity }) => {
  const { id, title, category, rating, address, reviewCount, bannerImageUrl, subImages } = activity;

  const navigate = useNavigate();

  const handleDeleteActivity = async () => {
    await deleteMyActivity(String(id));
    navigate('/');
  };

  return (
    <div className="w-full">
      {/* Banner Title */}
      <div className="flex flex-col w-full gap-2.5">
        <span className="text-gray-80 font-normal">{category}</span>
        <h1 className="text-4xl font-bold">{title}</h1>
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            <div className="flex">
              <img className="w-4" src="/assets/star_on_icon.svg" alt="rating star" />
              {rating}({reviewCount})
            </div>
            <img src="/assets/location_icon.svg" alt="location icon" />
            <span className="text-gray-80">{address}</span>
          </div>
          <CustomKebabMenu
            options={[
              {
                label: '수정하기',
                onClick: () =>
                  navigate('/my-activity/modify', {
                    state: { ...activity },
                  }),
              },
              { label: '삭제하기', onClick: handleDeleteActivity },
            ]}
          />
        </div>
      </div>
      {/* Banner Images */}
      <div className="flex w-full h-[534px] rounded-lg gap-3 mt-8">
        <img
          className="w-1/2 object-cover rounded-l-xl"
          src={bannerImageUrl}
          alt="Main Banner Img"
        />
        <SubImagesBanner subImages={subImages} />
      </div>
    </div>
  );
};

export default TopBanner;
