import { ModifyData } from '@/types/modifyActivityPage';
import Toast from '@/utils/Toast';

const requiredFields: { [key in keyof ModifyData]?: string } = {
  title: '제목은 필수 입력 사항입니다.',
  category: '카테고리는 필수 입력 사항입니다.',
  description: '설명은 필수 입력 사항입니다.',
  price: '가격은 필수 입력 사항입니다.',
  address: '주소는 필수 입력 사항입니다.',
  bannerImageUrl: '배너 이미지는 필수 입력 사항입니다.',
};

const checkRequireData = (modifyData: ModifyData | undefined): boolean => {
  if (!modifyData) {
    Toast.error('입력 사항을 기입해주세요.');
    return false;
  }
  return Object.entries(requiredFields).every(([key, message]) => {
    if (!modifyData[key as keyof ModifyData]) {
      Toast.error(message);
      return false;
    }
    return true;
  });
};

export default checkRequireData;
