import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-green-80 mb-4">404</h1>
      <p className="text-2xl text-gray-800 mb-8">페이지를 찾을 수 없습니다.</p>
      <button
        type="button"
        onClick={handleGoHome}
        className="px-6 py-3 bg-green-80 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default NotFound;
