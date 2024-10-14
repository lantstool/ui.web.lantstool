import { Link, useMatch } from 'react-router-dom';
import cn from './AccountLink.module.scss';

export const AccountLink = ({ to, text }) => {
  const match = useMatch(`/space/:spaceId/near-protocol/:networkId/accounts/:accountId/${to}`);

  return (
    <Link className={match ? cn.activeLink : cn.link} to={to}>
      {text}
    </Link>
  );
};
