import axiosInstance from '@/lib/axiosInstance';

const getDeleteNotification = async (notificationId: number): Promise<any> => {
  const response = await axiosInstance.delete(`/my-notifications/${notificationId}`);
  return response.data;
};

export default getDeleteNotification;
