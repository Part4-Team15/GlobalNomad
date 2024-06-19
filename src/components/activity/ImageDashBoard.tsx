import { useParams } from 'react-router-dom';
import { SubImage } from '@/types/activityPage';
import useActivityQuery from '@/hooks/useActivityQuery';

interface SubImagesBannerProps {
  subImages: SubImage[];
}

// 서브 이미지 배너 레이아웃
const SubImagesBanner: React.FC<SubImagesBannerProps> = ({ subImages }): JSX.Element => {
  const newSubImages = [];

  // 서브 이미지가 없을 경우
  if (subImages.length === 0) {
    return <div />;
  }
  if (subImages.length === 1) {
    newSubImages.push(
      <img
        key={subImages[0].id}
        className="w-full h-full md:h-full object-cover rounded-tr-xl rounded-br-xl"
        src={subImages[0].imageUrl}
        alt="Sub Banner Img"
      />,
    );
    return <div className="w-1/2 sm:w-[0px] gap-3">{newSubImages}</div>;
  }
  if (subImages.length === 2) {
    for (let index = 0; index < 2; index += 1) {
      newSubImages.push(
        <img
          key={index}
          className={`w-full h-[261px] md:h-[144px] object-cover ${index === 0 ? 'rounded-tr-xl' : ''} ${
            index === 1 ? 'rounded-br-xl' : ''
          } sm:hidden`}
          src={subImages[index].imageUrl}
          alt={`Sub Banner Img ${index + 1}`}
        />,
      );
    }
    return <div className="w-full sm:w-[0px] grid grid-cols-1 gap-3">{newSubImages}</div>;
  }
  if (subImages.length === 3) {
    for (let index = 0; index < 3; index += 1) {
      if (index === 2) {
        newSubImages.push(
          <img
            key={index}
            className="w-full sm:w-[0px] h-[261px] md:h-[144px] object-cover rounded-br-xl col-span-2"
            src={subImages[index].imageUrl}
            alt={`Sub Banner Img ${index + 1}`}
          />,
        );
        break;
      }
      newSubImages.push(
        <img
          key={index}
          className={`w-full h-[261px] md:h-[144px] object-cover ${index === 1 ? 'rounded-tr-xl' : ''}
          }`}
          src={subImages[index].imageUrl}
          alt={`Sub Banner Img ${index + 1}`}
        />,
      );
    }
    return <div className="w-1/2 sm:w-[0px] grid grid-cols-2 gap-3">{newSubImages}</div>;
  }
  if (subImages.length === 4) {
    for (let index = 0; index < 4; index += 1) {
      newSubImages.push(
        <img
          key={index}
          className={`w-full h-[261px] md:h-[144px] object-cover ${index === 1 ? 'rounded-tr-xl' : ''} ${
            index === 3 ? 'rounded-br-xl' : ''
          }`}
          src={subImages[index].imageUrl}
          alt={`Sub Banner Img ${index + 1}`}
        />,
      );
    }
  }
  return <div className="w-1/2 sm:w-[0px] grid grid-cols-2 gap-3 sm:hidden">{newSubImages}</div>;
};

const ImageDashBoard = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: activity,
    isLoading: activityLoading,
    isError: activityError,
  } = useActivityQuery(id || '');

  if (activityLoading) {
    return <div>이미지를 불러오고 있습니다</div>;
  }

  if (activityError || !activity) {
    return <div>이미지를 불러오는데 실패했습니다</div>;
  }

  const { bannerImageUrl, subImages } = activity;

  return (
    <div className="w-full mb-8">
      <div className="flex w-full h-[534px] sm:h-[310px] md:h-[300px] rounded-lg gap-3">
        {subImages.length === 0 ? (
          <img
            className="w-full object-cover rounded-xl"
            src={bannerImageUrl}
            alt="Main Banner Img"
          />
        ) : (
          <img
            className="w-1/2 sm:w-full sm:h-[310px] object-cover rounded-l-xl sm:rounded-xl"
            src={bannerImageUrl}
            alt="Main Banner Img"
          />
        )}
        <SubImagesBanner subImages={subImages} />
      </div>
    </div>
  );
};

export default ImageDashBoard;
