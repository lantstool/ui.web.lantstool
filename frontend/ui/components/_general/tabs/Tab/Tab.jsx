import cn from './Tab.module.scss';

export const Tab = ({ name, activeTab, setActiveTab, children, Icon }) => {
  const isActive = activeTab === name;
  const onClick = () => setActiveTab(name);

  return (
    <button type="button" onClick={onClick} className={isActive ? cn.activeTab : cn.tab}>
      {Icon}
      {children}
    </button>
  );
};
