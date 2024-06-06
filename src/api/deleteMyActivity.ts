import axiosInstance from '@/lib/axiosInstance';

const deleteMyActivity = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/my-activities/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error Delete My Activity Data:', error);
    throw error;
  }
};

export default deleteMyActivity;
