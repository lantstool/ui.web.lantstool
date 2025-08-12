import { Popper } from '@gc/Popper/Popper.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@gc/Button/Button.jsx';
import { useRef, useState } from 'react';
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

  const anchorRef = useRef(null);

  return (
    <div className={cn.sideMenu} ref={anchorRef}>
      <Button color="tertiary" size="small" iconLeftStyles={cn.menuIcon} onClick={openMenu} />
      <Popper isOpen={isOpen} closeMenu={closeMenu} position="left" anchorEl={anchorRef.current}>
        <div className={cn.container}>
          <div className={cn.wrapper}>
            <button className={cn.button} onClick={goToSettings}>
              <span className={cn.settingsIcon} />
              Settings
            </button>
            {/*<button className={cn.button}>*/}
            {/*  <span className={cn.feedBackIcon} />*/}
            {/*  Share feedback*/}
            {/*</button>*/}
          </div>
          <hr className={cn.border} />
          <div className={cn.wrapper}>
            <p className={cn.liteTitle}>Find us here</p>
            <div className={cn.icons}>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                className={cn.icon}
                to="https://github.com/lantstool/ui.web.lantstool"
              >
                <span className={cn.githubIcon} />
              </Link>
              <Link
                className={cn.icon}
                target="_blank"
                rel="noopener noreferrer"
                to="https://x.com/lantstool"
              >
                <span className={cn.xIcon} />
              </Link>
              <Link
                className={cn.icon}
                target="_blank"
                rel="noopener noreferrer"
                to="https://t.me/lantstool_announcements"
              >
                <span className={cn.telegramIcon} />
              </Link>
            </div>
          </div>
          <hr className={cn.border} />
          <div className={cn.wrapper}>
            {/*<p className={cn.title}>Privacy policy</p>*/}
            <p className={cn.liteTitle}>Lantstool v1.4.0</p>
          </div>
        </div>
      </Popper>
    </div>
  );
};
