import settingsMinimalisticOutline from '@assets/settingsMinimalisticOutline.svg';
import cn from './ConfigureTitle.module.scss';

export const ConfigureTitle = () => (
  <div className={cn.configureTitle}>
    <img src={settingsMinimalisticOutline} alt="#" />
    <h2 className={cn.title}>Configure parameters</h2>
  </div>
);
