import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <div className="flex flex-col w-full min-h-screen">
    <Header />
    <Outlet />
    <Footer />
  </div>
);

export default Layout;
