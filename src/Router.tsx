import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage';
import ActivityPage from './pages/ActivityPage';
import Layout from './pages/Layout';
import MyActivityPage from './pages/MyActivityPage';
import AssignActivityPage from './pages/AssignActivityPage';
import ModifyActivityPage from './pages/ModifyActivityPage';
import ReserveStatusPage from './pages/ReserveStatusPage';
import SearchResultPage from './pages/SearchResultPage';
import MyPageLayout from './components/common/profile/MyPageLayout';
import MyProfile from './pages/MyProfile';
import NotFound from './pages/Error404';
import ReservationHistoryPage from './pages/ReservationHistoryPage';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      {/* 아래 Route들은 Layout(Header, Footer) 추가 */}
      <Route path="/" element={<Layout />}>
        {/* 메인 페이지 */}
        <Route index element={<MainPage />} />
        {/* 메인 검색 페이지 */}
        <Route path="search" element={<SearchResultPage />} />
        {/* 체험 상세 페이지 */}
        <Route path="activity/:id" element={<ActivityPage />} />
        {/* 내 정보 */}
        <Route path="my" element={<MyPageLayout />}>
          <Route path="profile" element={<MyProfile />} />
          {/* 예약 내역 */}
          <Route path="reservation-history" element={<ReservationHistoryPage />} />
          {/* 내 체험 관리 */}
          <Route path="activity" element={<MyActivityPage />} />
          {/* 내 체험 관리 - 체험 등록 */}
          <Route path="activity/assign" element={<AssignActivityPage />} />
          {/* 내 체험 관리 - 체험 수정 */}
          <Route path="activity/:id/modify" element={<ModifyActivityPage />} />
          {/* 예약 현황 */}
          <Route path="reservation-status" element={<ReserveStatusPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
