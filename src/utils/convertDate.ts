const convertDate = (inputDate: string) => {
  const parts = inputDate.split('/');

  // 입력된 년도를 기준으로 알맞은 세기를 결정합니다.
  const century = parseInt(parts[0], 10) > 50 ? '19' : '20'; // radix 10을 명시해줍니다.

  // 년도를 두 자리에서 네 자리로 확장합니다.
  const year = century + parts[0];

  // 나머지 월과 일 정보를 그대로 가져옵니다.
  const month = parts[1];
  const day = parts[2];

  // 형식에 맞춰서 날짜를 재구성합니다.
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export default convertDate;
