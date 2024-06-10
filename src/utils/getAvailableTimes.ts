import {
  AvailableDate,
  AvailableReservationsType,
  AvailableSchedulesType,
} from '@/types/activityPage';

// 예약 가능한 시간과, 이미 예약된 시간 데이터를 비교해서, 실제 예약 가능한 시간대를 알아내기
export default function getAvailableTimes(
  reservationsResponse: AvailableReservationsType,
  scheduleResponse: AvailableSchedulesType[],
): AvailableDate[] {
  const reservedTimes = new Map<string, Set<string>>();

  reservationsResponse.reservations.forEach((reservation) => {
    const dateKey = reservation.date;
    const timeKey = `${reservation.startTime}-${reservation.endTime}`;
    if (!reservedTimes.has(dateKey)) {
      reservedTimes.set(dateKey, new Set());
    }
    reservedTimes.get(dateKey)!.add(timeKey);
  });

  return scheduleResponse
    .map((date) => {
      const availableTimes = date.times.filter((time) => {
        const timeKey = `${time.startTime}-${time.endTime}`;
        return !reservedTimes.has(date.date) || !reservedTimes.get(date.date)!.has(timeKey);
      });
      return {
        ...date,
        times: availableTimes,
      };
    })
    .filter((date) => date.times.length > 0);
}
