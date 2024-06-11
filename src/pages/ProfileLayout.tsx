import Profile from '@/components/common/profile/Profile';
import React from 'react';
import { Outlet } from 'react-router-dom';

const ProfileLayout = () => (
  <div className="h-[100%] pt-[50px] pb-[50px] lg:pr-[150px] md:pr-[30px] sm:pr-[24px] lg:pl-[150px] md:pl-[30px] sm:pl-[24px]">
    <div className="w-[100%] inline-flex items-start gap-6">
      <Profile />
      <Outlet />
    </div>
  </div>
);

export default ProfileLayout;
