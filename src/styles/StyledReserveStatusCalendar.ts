import Calendar, { CalendarProps } from 'react-calendar';
import styled from 'styled-components';

interface StyledCalendarProps extends CalendarProps {}

export const StyledReserveStatusCalendarWrapper = styled.div`
  .react-calendar {
    width: 100%;
    height: 100%;
    border: 1px solid #eeeeee;
    border-radius: 8px;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: gray;
  }

  .react-calendar:disabled {
    background-color: white;
  }

  /* 년월 스타일 */
  .react-calendar__navigation {
    width: 80%;
    padding: 5px 0;
    font-weight: 800;
    display: flex;
    justify-content: space-between;
  }

  .react-calendar__navigation__arrow {
    padding: 5px 10px;
  }

  .react-calendar__month-view {
    width: 85%;
    margin: 0 auto;
    padding: 10px;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
  }
  .react-calendar__month-view__weekdays__weekday {
    border: 1px solid #e8e8e8;
  }

  /* 요일 스타일 */
  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
    font-weight: 800;
  }

  /* 날짜의 글자 스타일 */
  .react-calendar__month-view__days__day-names,
  .react-calendar__month-view__days__day {
    font-size: 13px;
    font-weight: 600;
    padding: 2px;
  }

  /* 달력 타일 */
  .react-calendar__tile {
    display: flex;
    flex-direction: column;
    width: 100px;
    height: 120px;
    border: 1px solid #e8e8e8;
  }

  /* 호버 및 액티브 스타일 */
  .react-calendar__tile:focus,
  .react-calendar__tile:hover {
    border: 1px solid #0085ff;
  }

  .react-calendar__tile:disabled {
    background-color: white;
    color: gray;
  }

  /* 오늘 날짜 스타일 */
  .react-calendar__tile--now {
    border: 1px solid #0085ff;
  }

  @media (max-width: 768px) {
    .react-calendar__month-view__days__day-names,
    .react-calendar__month-view__days__day {
      font-size: 11px;
    }
  }
`;

export const StyledCalendar = styled(Calendar)<StyledCalendarProps>``;
