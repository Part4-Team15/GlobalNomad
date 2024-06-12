const dateToString = (date: Date) => {
  const year = date.getFullYear(); // 연도
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월 (0부터 시작하므로 +1 필요)
  const day = date.getDate().toString().padStart(2, '0'); // 일

  // 형식에 맞춰서 날짜를 재구성합니다.
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export default dateToString;
