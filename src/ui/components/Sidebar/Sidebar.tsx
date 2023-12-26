import { Link } from 'react-router-dom';
import cn from './Sidebar.module.css';

export const Sidebar = () => {
  return (
    <div className={cn.sidebar}>
      <h1 className={cn.logo}>Near Devtools</h1>
      <div className={cn.navigation}>
        <Link to="/transactions" className={cn.link}>Transactions</Link>
        <Link to="/vault" className={cn.link}>Vault</Link>
      </div>
      <p className={cn.profile}>eclipseeer</p>
    </div>
  );
};
