import axiosInstance from '@/lib/axiosInstance';

interface UploadProfileImageResponse {
  profileImageUrl: 'string';
}

const uploadProfileImage = async (file: File): Promise<UploadProfileImageResponse> => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axiosInstance.post('/users/me/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Upload Image');
    throw error;
  }
};

export default uploadProfileImage;
