import axiosInstance from '@/lib/axiosInstance';

interface PostActivityReservation {
  scheduleId: number;
  headCount: number;
}

const postActivityReservation = async ({
  selectedTimeId,
  attendeeCount,
  id,
}: {
  selectedTimeId: number;
  attendeeCount: number;
  id: string;
}): Promise<PostActivityReservation> => {
  const requestBody = {
    scheduleId: selectedTimeId,
    headCount: attendeeCount,
  };

  try {
    const response = await axiosInstance.post(`/activities/${id}/reservations`, requestBody);
    return response.data;
  } catch (error) {
    alert(error);
    throw error;
  }
};

export default postActivityReservation;
