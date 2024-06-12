import { Outlet } from 'react-router-dom';
import Profile from './Profile';

const MyPageLayout = () => (
  <div>
    <Profile />
    <Outlet />
  </div>
);

export default MyPageLayout;
