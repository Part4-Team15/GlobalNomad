import { useRef, useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import NotificationDropdown from './NotificationDropdown';

const Notification = () => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownIsOpen((prev) => !prev);
  };

  useClickOutside(dropdownRef, () => setDropdownIsOpen(false));

  return (
    <div ref={dropdownRef}>
      <img
        className="cursor-pointer"
        src="/assets/notification_icon.svg"
        alt="notification_icon"
        onClick={toggleDropdown}
      />
      {dropdownIsOpen && <NotificationDropdown />}
    </div>
  );
};

export default Notification;
