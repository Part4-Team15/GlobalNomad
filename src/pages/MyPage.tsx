import React from 'react';
import MyPageForm from '@/components/myPage/MyPageForm';
import Profile from '../components/common/profile/Profile';

const MyPage = () => (
  <div className="flex gap-6 justify-center bg-[#FAFAFA] pt-[65px]">
    <Profile />
    <MyPageForm />
  </div>
);

export default MyPage;
