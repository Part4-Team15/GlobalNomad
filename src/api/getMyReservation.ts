import axiosInstance from '@/lib/axiosInstance';

const getMyReservation = async (): Promise<any> => {
  const response = await axiosInstance.get('/my-reservations?size=10');
  return response.data;
};

export default getMyReservation;
