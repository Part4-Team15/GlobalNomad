import axiosInstance from '@/lib/axiosInstance';

interface GetUpdateMyReservationParams {
  activityId: number;
  reservationId: number;
  status: 'confirmed' | 'declined';
}

const getUpdateMyReservation = async ({
  activityId,
  reservationId,
  status,
}: GetUpdateMyReservationParams): Promise<any> => {
  const response = await axiosInstance.patch(
    `/my-activities/${activityId}/reservations/${reservationId}`,
    {
      status,
    },
  );

  return response.data;
};

export default getUpdateMyReservation;
