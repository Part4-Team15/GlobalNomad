import { useLocation } from 'react-router-dom';

interface PageMenuProp {
  linkTo: string;
  icon: any;
  activeIcon: any;
  name: string;
}

const PageMenu = ({ linkTo, icon, activeIcon, name }: PageMenuProp) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(linkTo);
  return (
    <a
      href={linkTo}
      className={`flex h-11 p-[9px] pr-[16px] pb-[9px] pl-[16px] items-center self-stretch rounded-xl ${
        isActive ? ' bg-green-100 text-black' : ' text-gray-400'
      }`}
    >
      <div className="flex gap-[14px]">
        <img src={isActive ? activeIcon : icon} alt="Icon" />
        <span className=" text-base font-bold">{name}</span>
      </div>
    </a>
  );
};

export default PageMenu;
