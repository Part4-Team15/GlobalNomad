import React from 'react';
import { useLocation } from 'react-router-dom';

const ModifyActivityPage = () => {
  const location = useLocation();
  console.log(location.state);
  return <div>체험 수정 페이지!</div>;
};
export default ModifyActivityPage;
