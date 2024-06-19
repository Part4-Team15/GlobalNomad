import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <div className="flex flex-col w-full min-h-screen [&_*]:transition [&_*]:duration-500">
    <Header />
    <div className="bg-gray-10 min-h-[calc(100vh-160px)]">
      <Outlet />
    </div>
    <Footer />
  </div>
);

export default Layout;
