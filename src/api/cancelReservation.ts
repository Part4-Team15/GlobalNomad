import axiosInstance from '@/lib/axiosInstance';

const cancelReservation = async (reservationId: number): Promise<void> => {
  const response = await axiosInstance.patch(`/my-reservations/${reservationId}`, {
    status: 'canceled',
  });
  return response.data;
};

export default cancelReservation;
