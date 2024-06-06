import getUserInfo from '@/api/getUserInfo';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';

import useClickOutside from '@/hooks/useClickOutside';
import HeaderProfileImage from './HeaderProfileImage';
import ProfileDropdown from './ProfileDropdown';

const HeaderProfile = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: getUserInfo,
  });
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownIsOpen((prev) => !prev);
  };

  useClickOutside(dropdownRef, () => setDropdownIsOpen(false));

  if (isLoading) {
    return <div>프로필을 불러오고 있습니다</div>;
  }

  if (isError || !data) {
    return <div>프로필을 불러오는데 실패했습니다</div>;
  }

  return (
    <div
      className="relative flex gap-[10px] items-center cursor-pointer"
      onClick={toggleDropdown}
      ref={dropdownRef}
    >
      <HeaderProfileImage nickname={data.nickname} profileImageUrl={data.profileImageUrl} />
      <div className="text-sm">{data?.nickname}</div>
      {dropdownIsOpen && <ProfileDropdown />}
    </div>
  );
};

export default HeaderProfile;
