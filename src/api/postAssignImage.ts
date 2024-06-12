import axiosInstance from '@/lib/axiosInstance';

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
    return null;
  }
};

export default postAssignImage;
