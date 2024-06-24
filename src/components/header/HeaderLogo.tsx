import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from './assets/logo_small.svg';

const HeaderLogo = () => (
  <Link to="/">
    <Logo className="fill-green-80 dark:fill-green-5"/>
  </Link>
);

export default HeaderLogo;
