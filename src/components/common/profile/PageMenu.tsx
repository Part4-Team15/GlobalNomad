import { PageMenuProps } from '@/types/myPageProfile';
import { Link, useLocation } from 'react-router-dom';

const PageMenu = ({ linkTo, icon, activeIcon, name, setIsShowProfileForm }: PageMenuProps) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(linkTo);

  const handleClick = () => {
    if (linkTo === '/my/profile' && setIsShowProfileForm) {
      setIsShowProfileForm(true);
    }
  };

  return (
    <li
      className={`flex h-11 p-[9px] pr-[16px] pb-[9px] pl-[16px] items-center self-stretch rounded-xl hover:bg-green-10
      ${isActive ? ' bg-green-10 text-black' : ' text-gray-60'}`}
    >
      <Link to={linkTo} onClick={handleClick}>
        <div className="flex gap-[14px]">
          <img src={isActive ? activeIcon : icon} alt="Icon" />
          <span className=" text-base font-bold">{name}</span>
        </div>
      </Link>
    </li>
  );
};

export default PageMenu;
