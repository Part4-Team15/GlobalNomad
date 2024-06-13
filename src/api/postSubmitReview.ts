import axiosInstance from '@/lib/axiosInstance';

const postSubmitReview = async ({
  bookingId,
  rating,
  content,
}: {
  bookingId: number;
  rating: number;
  content: string;
}) => {
  const response = await axiosInstance.post(`/my-reservations/${bookingId}/reviews`, {
    rating,
    content,
  });
  return response.data;
};

export default postSubmitReview;
