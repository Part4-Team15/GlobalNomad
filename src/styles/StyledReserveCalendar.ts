import Calendar, { CalendarProps } from 'react-calendar';
import styled from 'styled-components';
// import 'react-calendar/dist/Calendar.css';

interface StyledCalendarProps extends CalendarProps {}

export const StyledReserveCalendarWrapper = styled.div`
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
    color: #4b4b4b;
    text-align: center;
  }

  /* 요일 스타일 */
  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
    font-weight: 800;
  }

  /* 날짜의 글자 스타일 */
  .react-calendar__month-view__days__day-names,
  .react-calendar__month-view__days__day {
    color: black;
    font-size: 13px;
    font-weight: 600;
    padding: 10px;
  }

  /* 달력 타일 */
  .react-calendar__tile {
    border-radius: 8px;
    width: 32px;
    height: 36px;
    border: 2px solid #fff;
    padding-top: 8px;
    padding-left: 8px;
  }

  /* 호버 및 액티브 스타일 */
  .react-calendar__tile:focus,
  .react-calendar__tile:hover {
    background-color: #0b3b2d;
    color: white;
  }

  .react-calendar__tile:disabled {
    background-color: white;
    color: gray;
  }

  /* 오늘 날짜 스타일 */
  .react-calendar__tile--now {
    background-color: #ced8d5;
    color: #0b3b2d;
  }

  .react-calendar__tile.available {
    border: 2px solid #0b3b2d;
  }
`;

export const StyledCalendar = styled(Calendar)<StyledCalendarProps>``;
