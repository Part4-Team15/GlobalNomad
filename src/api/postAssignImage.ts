import axios from 'axios';
import axiosInstance from '@/lib/axiosInstance';
import Toast from '@/utils/Toast';

const postAssignImage = async (assignImage: FormData) => {
  try {
    const res = await axiosInstance.post('/activities/image', assignImage, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (e) {
    console.error('Error: ', e);
    if (axios.isAxiosError(e)) {
      if (e.message === 'Network Error') {
        Toast.error('이미지 파일 용량이 큽니다.');
      } else Toast.error(e.message);
    }
    return null;
  }
};

export default postAssignImage;
