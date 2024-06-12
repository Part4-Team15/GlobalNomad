const getFormatDate = (isoString: string): string => {
  const date = new Date(isoString);

  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1; // getUTCMonth()는 0부터 시작하므로 1을 더합니다.
  const day = date.getUTCDate();

  return `${year}.${month}.${day}`;
};

export default getFormatDate;
