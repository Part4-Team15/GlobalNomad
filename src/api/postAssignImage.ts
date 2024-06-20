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
      const errorMessage = e.response?.data?.message;
      Toast.error(errorMessage);
    }
    return null;
  }
};

export default postAssignImage;
