import { Link, useLocation, useParams } from 'react-router-dom';
import cn from './AccountLink.module.css';

export const AccountLink = ({ to, text }) => {
  const { pathname } = useLocation();
  const { currentNetworkId, accountId } = useParams();

  const isActive = pathname === `/${currentNetworkId}/accounts/${accountId}/${to}`;
  return (
    <Link className={isActive ? `${cn.link} ${cn.active}` : cn.link} to={to}>
      {text}
    </Link>
  );
};
