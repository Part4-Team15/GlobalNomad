import axiosInstance from '@/lib/axiosInstance';

const getMyActivity = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get('/my-activities');
    return response.data;
  } catch (error) {
    console.error('Error fetching My activity data:', error);
    throw error;
  }
};

export default getMyActivity;
