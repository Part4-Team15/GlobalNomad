import { useQuery } from '@tanstack/react-query';
import getMyActivity from '@/api/getMyActivity';
import React, { useEffect, useState } from 'react';
import getReservationYearAndMonth from '@/api/getReservationYearAndMonth';
import Calendar from 'react-calendar';
import moment from 'moment';
import ActivityDropDownBox from './ActivityDropDownBox';
import 'react-calendar/dist/Calendar.css';
import PendingTileBlock from './PendingTileBlock';
import CompletedTileBlock from './CompletedTileBlock';
import ComfimedTileBlock from './ComfirmedTileBlock';

interface ReservationType {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}

interface Activity {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  address: string;
  bannerImageUrl: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

interface ActivityData {
  activities: Activity[];
}

interface MonthInfo {
  year: string;
  month: string;
}

const ReserveStatusContent = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [activeMonth, setActiveMonth] = useState<MonthInfo>({
    year: moment().format('YYYY'),
    month: moment().format('MM'),
  });
  const { data, isLoading, error } = useQuery<ActivityData>({
    queryKey: ['myActivity'],
    queryFn: getMyActivity,
  });

  const { data: reservationData } = useQuery({
    queryKey: ['reservationTimeTable', selectedActivity?.id, activeMonth.year, activeMonth.month],
    queryFn: getReservationYearAndMonth,
  });

  const getActiveMonth = (activeStartDate: Date) => {
    const activeYearMonth = {
      year: moment(activeStartDate).format('YYYY'),
      month: moment(activeStartDate).format('MM'),
    };
    console.log('Active Year-Month:', activeYearMonth);
    setActiveMonth(activeYearMonth);
  };

  useEffect(() => {
    if (data && data.activities && data.activities.length > 0) {
      setSelectedActivity(data.activities[0]);
    }
  }, [data]);

  useEffect(() => {
    const currentDate = new Date();
    const initialYearMonth = {
      year: moment(currentDate).format('YYYY'),
      month: moment(currentDate).format('MM'),
    };
    setActiveMonth(initialYearMonth);
    console.log('Initial Year-Month:', initialYearMonth);
  }, []);

  if (isLoading) {
    return <div>데이터 불러오는중</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  console.log(reservationData);
  // 타일의 내용을 커스터마이즈하는 함수
  const tileContent = ({ date }: { date: Date }) => {
    // 일치하는 날짜가 없는 경우 빈 문자열 반환
    if (!reservationData) return '';

    // 예약 데이터에서 해당 날짜의 정보 가져오기
    const matchedReservation = reservationData.find(
      (item: ReservationType) => item.date === moment(date).format('YYYY-MM-DD'),
    );

    // 해당 날짜에 예약 정보가 있는 경우 각 상태의 개수를 표시
    if (matchedReservation) {
      const { completed, confirmed, pending } = matchedReservation.reservations;
      return (
        <div>
          {pending !== 0 && <PendingTileBlock count={pending} />}
          <br />
          {completed !== 0 && <CompletedTileBlock count={completed} />}
          <br />
          {confirmed !== 0 && <ComfimedTileBlock count={confirmed} />}
          <br />
        </div>
      );
    }

    return ''; // 예약 정보가 없는 경우 빈 문자열 반환
  };

  return (
    <div className="w-[800px]">
      <div className="flex flex-col gap-8">
        <div className="text-[32px] font-bold">예약 현황</div>
        <ActivityDropDownBox
          setSelectedActivity={setSelectedActivity}
          activities={data?.activities}
          selectedActivity={selectedActivity}
        />
      </div>
      {selectedActivity && <div>{selectedActivity.title}</div>}
      <Calendar
        className="w-full p-0"
        locale="ko"
        formatShortWeekday={(locale, date) =>
          ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]}
        formatDay={(locale, date) => moment(date).format('DD')}
        calendarType="hebrew"
        onActiveStartDateChange={(datas) => {
          if (datas.activeStartDate) {
            getActiveMonth(datas.activeStartDate);
          }
        }}
        tileContent={tileContent}
      />
    </div>
  );
};

export default ReserveStatusContent;
