import { Link } from 'react-router-dom';

const HeaderLogo = () => (
  <Link to="/">
    <img className="cursor-pointer" src="/assets/logo_small.svg" alt="header_logo" />
  </Link>
);

export default HeaderLogo;
