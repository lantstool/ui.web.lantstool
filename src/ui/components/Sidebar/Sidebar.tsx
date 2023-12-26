import { Navigation } from './Navigation/Navigation.tsx';
import cn from './Sidebar.module.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
export const Sidebar = () => {
  return (
    <div className={cn.container}>
      <div>
        <h2 className={cn.title}>Near Devtools</h2>
        <div className={cn.subtitleWrapper}>
          <div className={cn.subtitleGroup}>
            <h4 className={cn.subtitle}>Personal space</h4>
            <KeyboardArrowDownIcon style={{ color: 'white' }} />
          </div>
          <div className={cn.subtitleGroup}>
            <h4 className={cn.subtitle}>TestNet</h4>
            <KeyboardArrowDownIcon style={{ color: 'white' }} />
          </div>
        </div>
      </div>
      <Navigation />
      <h2 className={cn.name}>eclipseeer</h2>
    </div>
  );
};
