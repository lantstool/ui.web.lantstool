import { Link } from 'react-router-dom';
import cn from './Sidebar.module.css';

export const Sidebar = () => {
  return (
    <div className={cn.container}>
      Near Devtools
      <Link to="/transactions">Transactions</Link>
      <Link to="/vault">Vault</Link>
    </div>
  );
};
