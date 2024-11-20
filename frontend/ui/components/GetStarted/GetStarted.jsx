import React, { useState } from 'react';
import { Button } from '../_general/Button/Button.jsx';
import { Link } from 'react-router-dom';
import { RestoreFromBackup } from './RestoreFromBackup/RestoreFromBackup.jsx';
import cn from './GetStarted.module.scss';

export const GetStarted = () => {
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <div className={cn.container}>
      <h1>Get Started</h1>
      <Link to="/spaces/create">Create Space</Link>
      <Button onClick={openModal}>Restore From Backup</Button>
      {isOpen && <RestoreFromBackup closeModal={closeModal} />}
    </div>
  );
};
