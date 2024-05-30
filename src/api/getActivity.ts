import axiosInstance from '@/lib/axiosInstance';

interface Activity {
  title: string;
  category: string;
  rating: string;
  address: string;
  reviewCount: string;
  description: string;
  price: number;
}

const getActivity = async (id: string): Promise<Activity> => {
  try {
    const response = await axiosInstance.get(`/activities/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching activity data:', error);
    throw error;
  }
};

export default getActivity;
