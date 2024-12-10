import { useNavigate } from 'react-router-dom';
import { SettingsOutline } from '../../../../_general/icons/SettingsOutline.jsx';
import cn from './List.module.scss';

export const List = ({ ids }) => {
  const navigate = useNavigate();

  const navigateTo = (e, link) => {
    e.stopPropagation();
    navigate(link);
  };

  return (
    <div className={cn.list}>
      {ids.map((networkId) => {
        return (
          <div onClick={(e) => navigateTo(e, `../${networkId}`)} key={networkId} className={cn.row}>
            <div className={cn.container}>
              <p className={cn.title}>{networkId}</p>
            </div>
            <div className={cn.container}>
              <div
                onClick={(e) => navigateTo(e, `../${networkId}/settings`)}
                className={cn.settings}
              >
                <SettingsOutline style={cn.icon} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
