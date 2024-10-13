import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar.jsx';
import cn from './Network.module.scss';
import { useState } from 'react';

export const Network = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={isOpen ? cn.network : cn.closedNetwork}>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Outlet />
    </div>
  );
};
