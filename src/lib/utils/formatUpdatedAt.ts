const formatUpdatedAt = (updatedAt: string) => {
  const updatedDate = new Date(updatedAt);
  const currentDate = new Date();
  const diffInMs = currentDate.getTime() - updatedDate.getTime();
  const diffInMin = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMin / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) {
    return `${diffInYears}년 전`;
  }
  if (diffInDays > 0) {
    return `${diffInDays}일 전`;
  }
  if (diffInHours > 0) {
    return `${diffInHours}시간 전`;
  }
  if (diffInMin > 0) {
    return `${diffInMin}분 전`;
  }
  return '방금 전';
};

export default formatUpdatedAt;
