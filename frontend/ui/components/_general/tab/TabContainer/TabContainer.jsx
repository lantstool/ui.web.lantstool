import cnm from 'classnames';
import cn from './TabContainer.module.scss';

export const TabContainer = ({ children, classes }) => (
  <div className={cnm(cn.tabContainer, classes?.container && classes.container)}>{children}</div>
);
