import { useNavigate } from 'react-router-dom';
import { useStoreState } from '@react-vault';
import { Badge } from '../../_general/Badge/Badge.jsx';
import { SettingsOutline } from '../../_general/icons/SettingsOutline.jsx';
import { Label } from '../../_general/Label/Label.jsx';
import cn from './List.module.scss';

const types = {
  local: 'Local',
};

const getType = (type) => {
  return types[type] ? types[type] : 'Local';
};

export const List = ({ ids }) => {
  const records = useStoreState((store) => store.spaces.records);
  const navigate = useNavigate();

  const navigateTo = (e, link) => {
    e.stopPropagation();
    navigate(link);
  };

  return (
    <div className={cn.list}>
      {ids.map((spaceId) => {
        const { name, badge, type } = records[spaceId];
        const convertedType = getType(type);
        return (
          <div onClick={(e) => navigateTo(e, `/space/${spaceId}`)} key={spaceId} className={cn.row}>
            <div className={cn.container}>
              <Badge badge={badge} />
              <p className={cn.title}>{name}</p>
            </div>
            <div className={cn.container}>
              <Label color="grey">{convertedType}</Label>
              <div
                onClick={(e) => navigateTo(e, `/space/${spaceId}/settings`)}
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
