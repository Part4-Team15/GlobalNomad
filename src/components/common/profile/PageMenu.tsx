import { Link, useLocation } from 'react-router-dom';

interface PageMenuProp {
  linkTo: string;
  icon: any;
  activeIcon: any;
  name: string;
  setIsShowProfileForm?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PageMenu = ({ linkTo, icon, activeIcon, name, setIsShowProfileForm }: PageMenuProp) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(linkTo);

  const handleClick = () => {
    if (linkTo === '/my/profile' && setIsShowProfileForm) {
      setIsShowProfileForm(true);
    }
  };

  return (
    <Link
      to={linkTo}
      className={`flex h-11 p-[9px] pr-[16px] pb-[9px] pl-[16px] items-center self-stretch rounded-xl hover:bg-green-10
      ${isActive ? ' bg-green-10 text-black' : ' text-gray-60'}`}
      onClick={handleClick}
    >
      <div className="flex gap-[14px]">
        <img src={isActive ? activeIcon : icon} alt="Icon" />
        <span className=" text-base font-bold">{name}</span>
      </div>
    </Link>
  );
};

export default PageMenu;
