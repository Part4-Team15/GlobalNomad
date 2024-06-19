import getMyActivity from '@/api/getMyActivity';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Calendar from 'react-calendar';
import moment from 'moment';
import getReservationYearAndMonth from '@/api/getReservationYearAndMonth';
import queryKeys from '@/api/reactQuery/queryKeys';
import { StyledReserveStatusCalendarWrapper } from '@/styles/StyledReserveStatusCalendar';
import ActivityDropDownBox from './ActivityDropDownBox';
import ActivityDropDown from './ActivityDropDown';
import PendingTileBlock from './PendingTileBlock';
import ConfimedTileBlock from './ConfirmedTileBlock';
import CompletedTileBlock from './CompletedTileBlock';
import ReservationModal from './reservationModal/ReservationModal';

interface ReservationData {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}

interface Activity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

interface ActivityData {
  activities: Activity[];
  totalCount: number;
  cursorId: number;
}
const ReserveStatusContent = () => {
  const currentDate = moment();
  // 달력에서 선택된 날짜를 저장하는 state
  const [selectedDate, setSelectedDate] = useState<{
    year: string;
    month: string;
    day: string | null;
  }>({
    year: currentDate.format('YYYY'),
    month: currentDate.format('MM'),
    day: null,
  });
  // 드롭다운 state
  const [viewActivityDropDown, setViewActivityDropDown] = useState<boolean>(false);

  // 모달state
  const [viewReservationModal, setViewReservationModal] = useState<boolean>(false);

  // 선택된 activity state
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  // useInfiniteQuery를 사용해 무한 스크롤 구현
  const { data: activityData, fetchNextPage } = useInfiniteQuery<ActivityData>({
    // queryKey: ['activity', 7],
    queryKey: queryKeys.activities(),
    queryFn: getMyActivity,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.cursorId,
  });

  // 년도와 월을 이용해 예약 목록을 불러오는 함수
  const { data: reservationData } = useQuery({
    queryKey: queryKeys.reservationTimeTable(
      selectedActivity?.id || 0,
      selectedDate.year,
      selectedDate.month,
    ),
    queryFn: getReservationYearAndMonth,
  });
  const activities = activityData?.pages.flatMap((page) => page.activities) || [];
  useEffect(() => {
    // activities가 존재할때 첫 번째 원소를 selectedActivity에 설정
    if (activities.length > 0 && !selectedActivity) {
      setSelectedActivity(activities[0]);
    }
  }, [activities, selectedActivity]);

  const { inView, ref } = useInView();
  const getActiveMonth = (activeStartDate: moment.MomentInput) => {
    const changeDate = {
      year: moment(activeStartDate).format('YYYY'),
      month: moment(activeStartDate).format('MM'),
      day: null,
    };
    setSelectedDate(changeDate);
  };
  const onClickCalendarTile = (date: Date) => {
    setSelectedDate((prev) => ({
      ...prev,
      day: moment(date).format('DD'),
    }));
    setViewReservationModal(true);
  };
  const tileContent = ({ date }: { date: Date }) => {
    // 일치하는 날짜가 없는 경우 빈 문자열 반환
    if (!reservationData) return '';

    // 예약 데이터에서 해당 날짜의 정보 가져오기
    const matchedReservation = reservationData.find(
      (item: ReservationData) => item.date === moment(date).format('YYYY-MM-DD'),
    );

    // 해당 날짜에 예약 정보가 있는 경우 각 상태의 개수를 표시
    if (matchedReservation) {
      const { completed, confirmed, pending } = matchedReservation.reservations;
      return (
        <div className="w-full h-full text-left flex flex-col-reverse">
          <div onClick={() => onClickCalendarTile(date)}>
            {pending !== 0 && <PendingTileBlock count={pending} />}
            {completed !== 0 && <CompletedTileBlock count={completed} />}
            {confirmed !== 0 && <ConfimedTileBlock count={confirmed} />}
          </div>
        </div>
      );
    }

    return ''; // 예약 정보가 없는 경우 빈 문자열 반환
  };

  return (
    <div className="w-full min-w-[21.375rem] relative">
      <h1 className="text-[32px] font-bold text-black mb-8">예약 현황</h1>
      {/* 드롭다운 박스에 선택된 activity title 표시 */}
      <ActivityDropDownBox
        selectedActivityTitle={selectedActivity ? selectedActivity?.title : ''}
        setViewActivityDropDown={setViewActivityDropDown}
      />

      {/* 전체 Activity 드롭다운으로 표시 */}
      {viewActivityDropDown && (
        <div className="absolute w-[800px] ">
          <ActivityDropDown
            activities={activities}
            inView={inView}
            fetchNextPage={fetchNextPage}
            ref={ref}
            setViewActivityDropDown={setViewActivityDropDown}
            viewActivityDropDown={viewActivityDropDown}
            setSelectedActivity={setSelectedActivity}
          />
        </div>
      )}
      <StyledReserveStatusCalendarWrapper>
        <Calendar
          className="w-full p-0"
          locale="ko"
          formatShortWeekday={(locale, date) =>
            ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]
          }
          calendarType="hebrew"
          onActiveStartDateChange={({ activeStartDate }) => getActiveMonth(activeStartDate)}
          tileContent={tileContent}
        />
      </StyledReserveStatusCalendarWrapper>
      {viewReservationModal && selectedActivity && (
        <ReservationModal
          setViewReservationModal={setViewReservationModal}
          selectedDate={selectedDate}
          activitiyId={selectedActivity.id}
          viewReservationModal={viewReservationModal}
        />
      )}
    </div>
  );
};

export default ReserveStatusContent;
