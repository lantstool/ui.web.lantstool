import cnm from 'classnames';
import { addPropsToChildren } from '../../../../utils.js';
import cn from './Tabs.module.scss';

export const Tabs = ({ children, classes, activeTab, setActiveTab }) => {
  const childrenWithProps = addPropsToChildren(children, {
    activeTab,
    setActiveTab,
  });

  return (
    <div className={cnm(cn.tabs, classes?.container && classes.container)}>{childrenWithProps}</div>
  );
};
