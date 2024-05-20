import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage';
import Layout from './pages/Layout';
import MyPage from './pages/MyPage';
import ReservationsPage from './pages/ReservationsPage';
import MyActivityPage from './pages/MyActivityPage';
import AssignActivityPage from './pages/AssignActivityPage';
import ModifyActivityPage from './pages/ModifyActivityPage';
import ReserveStatusPage from './pages/ReserveStatusPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      {/* 아래 Route들은 Layout(Header, Footer) 추가 */}
      <Route path="/" element={<Layout />}>
        {/* 메인 페이지 */}
        <Route index element={<MainPage />} />
        {/* 내 정보 */}
        <Route path="my-page" element={<MyPage />} />
        {/* 예약 내역 */}
        <Route path="reservations" element={<ReservationsPage />} />
        {/* 내 체험 관리 */}
        <Route path="my-activity" element={<MyActivityPage />}>
          {/* 내 체험 관리 - 체험 등록 */}
          <Route path="assgin" element={<AssignActivityPage />} />
          {/* 내 체험 관리 - 체험 수정 */}
          <Route path="modify" element={<ModifyActivityPage />} />
        </Route>
        {/* 예약 현황 */}
        <Route path="reserve-status" element={<ReserveStatusPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
