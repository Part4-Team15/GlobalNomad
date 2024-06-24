import axiosInstance from '@/lib/axiosInstance';
import { AvailableSchedulesType } from '@/types/activityPage';

const getAvailableSchedule = async ({
  id,
  selectedYear,
  selectedMonth,
}: {
  id: string;
  selectedYear: string;
  selectedMonth: string;
}): Promise<AvailableSchedulesType[]> => {
  try {
    const response = await axiosInstance.get(
      `/activities/${id}/available-schedule?year=${selectedYear}&month=${selectedMonth}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching available schedule data:', error);
    throw error;
  }
};

export default getAvailableSchedule;
