import moment from 'moment';

const getMonthAndYear = (selectedDate: any) => {
  let selectedYMD = '';
  let selectedYear = '';
  let selectedMonth = '';
  let selectedDay = '';
  // SelectedDate가 배열인지, 단일 값인지 확인
  if (selectedDate) {
    if (Array.isArray(selectedDate)) {
      const [start, end] = selectedDate;
      if (start) {
        selectedYMD = moment(start).format('YYYY-MM-DD');
        selectedYear = moment(start).format('YYYY');
        selectedMonth = moment(start).format('MM');
        selectedDay = moment(start).format('DD');
      }
      if (end) {
        selectedYMD = moment(end).format('YYYY-MM-DD');
        selectedYear = moment(end).format('YYYY');
        selectedMonth = moment(end).format('MM');
        selectedDay = moment(end).format('DD');
      }
    } else {
      selectedYMD = moment(selectedDate).format('YYYY-MM-DD');
      selectedYear = moment(selectedDate).format('YYYY');
      selectedMonth = moment(selectedDate).format('MM');
      selectedDay = moment(selectedDate).format('DD');
    }
  }

  return { selectedYMD, selectedYear, selectedMonth, selectedDay };
};

export default getMonthAndYear;
