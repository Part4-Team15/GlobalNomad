import Footer from '@/components/footer/Footer';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <>
    <div>Header</div>
    <Outlet />
    <Footer />
  </>
);

export default Layout;
