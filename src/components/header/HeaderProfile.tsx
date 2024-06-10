import { useRef, useState } from 'react';

import useClickOutside from '@/hooks/useClickOutside';
import useUserInfoQuery from '@/hooks/useUserInfoQuery';
import { Link } from 'react-router-dom';

import ProfileDropdown from './ProfileDropdown';
import DefaultProfileImage from './NoProfileImage';
import HeaderProfileImage from './HeaderProfileImage';

const HeaderProfile = () => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { userInfo, isLoading, isError } = useUserInfoQuery();
  const toggleDropdown = () => {
    setDropdownIsOpen((prev) => !prev);
  };

  useClickOutside(dropdownRef, () => setDropdownIsOpen(false));
  const nickname = userInfo?.nickname || '';
  const profileImageUrl = userInfo?.profileImageUrl || '';

  if (isLoading) {
    return <p>프로필을 불러오고 있습니다...</p>;
  }

  if (isError) {
    return <Link to="/login">다시 로그인해주세요</Link>;
  }

  return (
    <div
      className="relative flex gap-[10px] items-center cursor-pointer"
      onClick={toggleDropdown}
      ref={dropdownRef}
    >
      {profileImageUrl ? (
        <HeaderProfileImage profileImageUrl={profileImageUrl} />
      ) : (
        <DefaultProfileImage nickname={nickname} />
      )}
      <div className="text-sm font-medium text-[#1B1B1B]">{nickname}</div>
      {dropdownIsOpen && <ProfileDropdown />}
    </div>
  );
};

export default HeaderProfile;
