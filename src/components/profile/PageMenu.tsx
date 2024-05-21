import { useLocation } from 'react-router-dom';

interface PageMenuProp {
  linkTo: string;
  icon: any;
  name: string;
}

const PageMenu = ({ linkTo, icon, name }: PageMenuProp) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(linkTo);
  return (
    <a
      href={linkTo}
      className={`flex h-11 p-[9px] pr-[16px] pb-[9px] pl-[16px] items-center self-stretch text-gray-400 rounded-xl ${
        isActive ? ' bg-gray-400 text-black' : ''
      }`}
    >
      <div className="flex gap-[14px]">
        <img src={icon} alt="Icon" style={{ filter: isActive ? 'none' : 'hue-rotate(90deg)' }} />
        <span className=" text-base font-bold">{name}</span>
      </div>
    </a>
  );
};

export default PageMenu;
