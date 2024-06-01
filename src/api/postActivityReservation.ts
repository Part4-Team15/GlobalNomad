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
    console.error('예약 요청 중 오류 발생');
    throw error;
  }
};

export default postActivityReservation;
