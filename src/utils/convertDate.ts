const convertDate = (inputDate: string) => {
  const parts = inputDate.split('/');

  const yearPart = parts[0];
  const month = parts[1].padStart(2, '0'); // 월이 한 자리일 경우 앞에 0을 붙입니다.
  const day = parts[2].padStart(2, '0'); // 일이 한 자리일 경우 앞에 0을 붙입니다.

  // 년도를 두 자리에서 네 자리로 확장합니다.
  const year =
    yearPart.length === 2
      ? (parseInt(yearPart, 10) > 50 ? '19' : '20') + yearPart
      : yearPart;

  // 형식에 맞춰서 날짜를 재구성합니다.
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export default convertDate;
