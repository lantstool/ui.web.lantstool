import { SettingsOutline } from '../../_general/icons/SettingsOutline.jsx';
import { FeedbackOutline } from '../../_general/icons/FeedbackOutline.jsx';
import { Popper } from '../_general/Popper/Popper.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { Github } from '../../_general/icons/Github.jsx';
import { X } from '../../_general/icons/X.jsx';
import { Telegram } from '../../_general/icons/Telegram.jsx';
import { Button } from '../../_general/Button/Button.jsx';
import { MenuDotsOutline } from '../../_general/icons/MenuDotsOutline.jsx';
import { useState } from 'react';
import cn from './SideMenu.module.scss';

export const SideMenu = () => {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);

  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);

  const goToSettings = () => {
    navigate('/settings');
    closeMenu();
  };

  return (
    <div className={cn.sideMenu}>
      <Button color="tertiary" size="small" IconLeft={MenuDotsOutline} onClick={openMenu} />
      <Popper isOpen={isOpen} closeMenu={closeMenu} position={'right'}>
        <div className={cn.container}>
          <div className={cn.wrapper}>
            <button className={cn.button} onClick={goToSettings}>
              <SettingsOutline />
              Settings
            </button>
            <button className={cn.button}>
              <FeedbackOutline />
              Share feedback
            </button>
          </div>
          <hr className={cn.border} />
          <div className={cn.wrapper}>
            <p className={cn.liteTitle}>Find us here</p>
            <div className={cn.icons}>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                to="https://github.com/lantstool/ui.web.lantstool"
              >
                <Github style={cn.icon} />
              </Link>
              <Link target="_blank" rel="noopener noreferrer" to="https://x.com/?lang=uk">
                <X style={cn.icon} />
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                to="https://web.telegram.org/k/#@azov_media"
              >
                <Telegram style={cn.icon} />
              </Link>
            </div>
          </div>
          <hr className={cn.border} />
          <div className={cn.wrapper}>
            <p className={cn.title}>Privacy policy</p>
            <p className={cn.liteTitle}>Lantstool v1.0.0</p>
          </div>
        </div>
      </Popper>
    </div>
  );
};
