import Calendar, { CalendarProps } from 'react-calendar';
import styled from 'styled-components';

interface StyledCalendarProps extends CalendarProps {}

export const StyledActivityCalendar = styled.div`
  .react-calendar {
    width: 100%;
    border: 1px solid #dddddd;
    border-radius: 8px;
    padding: 10px;
    background-color: #ffffff;
  }

  .react-calendar:disabled {
    background-color: #f0f0f0;
  }

  /* 년월 스타일 */
  .react-calendar__navigation {
    width: 100%;
    padding: 10px 0;
    font-weight: 600;
    font-size: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333333;
  }

  .react-calendar__navigation__arrow {
    padding: 5px;
    color: #333333;
  }

  .react-calendar__navigation button:disabled {
    background-color: #f0f0f0;
  }

  .react-calendar__month-view {
    width: 100%;
    padding: 10px 0;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    color: #666666;
  }

  .react-calendar__month-view__weekdays__weekday {
    border-bottom: 1px solid #e6e6e6;
    padding: 8px 0;
  }

  /* 요일 스타일 */
  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
    font-weight: 700;
    color: #666666;
  }

  /* 토요일 스타일 */
  .react-calendar__month-view__weekdays__weekday:nth-child(6) abbr {
    color: #1e90ff;
  }

  /* 일요일 스타일 */
  .react-calendar__month-view__weekdays__weekday:nth-child(7) abbr {
    color: #ff4500;
  }

  /* 날짜의 글자 스타일 */
  .react-calendar__month-view__days__day-names,
  .react-calendar__month-view__days__day {
    font-size: 18px;
    font-weight: 600;
    color: #333333;
    padding: 10px;
    text-align: center;
  }

  /* 토요일 날짜 스타일 */
  .react-calendar__month-view__days__day:nth-child(7n-1) {
    color: #1e90ff;
  }

  /* 일요일 날짜 스타일 */
  .react-calendar__month-view__days__day:nth-child(7n) {
    color: #ff4500;
  }

  /* 달력 타일 */
  .react-calendar__tile {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  /* 호버 및 액티브 스타일 */
  .react-calendar__tile:focus,
  .react-calendar__tile:hover {
    background-color: #f0f8ff;
    cursor: pointer;
  }

  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
    color: #cccccc;
  }

  /* 오늘 날짜 스타일 */
  .react-calendar__tile--now {
    background-color: #9effcc;
    font-weight: 700;
    border: 1px solid #9effcc;
  }

  /* 선택된 날짜 스타일 */
  .react-calendar__tile--active {
    background-color: #9effcc;
    color: #ffffff;
    font-weight: 700;
  }

  /* 오늘 날짜 호버 스타일 */
  .react-calendar__tile--now:hover {
    background-color: #d0f0ff;
  }

  /* 선택된 날짜 호버 스타일 */
  .react-calendar__tile--active:hover {
    background-color: #006bb3;
  }
`;

export const StyledCalendar = styled(Calendar)<StyledCalendarProps>``;
