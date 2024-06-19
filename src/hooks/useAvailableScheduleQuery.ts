import { useQuery } from '@tanstack/react-query';
import { AvailableSchedulesType } from '@/types/activityPage';
import queryKeys from '@/api/reactQuery/queryKeys';
import getAvailableSchedule from '@/api/getAvailableSchedule';
import getMonthAndYear from '@/utils/getMonthAndYear';

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

const useAvailableScheduleQuery = (id: string, selectedDate: SelectedDate) => {
  return useQuery<AvailableSchedulesType[]>({
    queryKey: queryKeys.availableSchedules(id || ''),
    queryFn: () => {
      const { selectedYear, selectedMonth } = getMonthAndYear(selectedDate);
      return getAvailableSchedule({
        id: id!,
        selectedYear,
        selectedMonth,
      });
    },
    enabled: !!id,
  });
};

export default useAvailableScheduleQuery;
