import { Link } from 'react-router-dom';
import { useStoreState } from '@react-vault';
import { Badge } from '../../_general/Badge/Badge.jsx';
import { SettingsOutline } from '../../_general/icons/SettingsOutline.jsx';
import { Label } from '../../_general/Label/Label.jsx';
import cn from './List.module.scss';

export const List = ({ ids }) => {
  const records = useStoreState((store) => store.spaces.records);

  return (
    <div className={cn.list}>
      {ids.map((spaceId) => {
        const { name, badge, type } = records[spaceId];
        return (
          <Link to={`/space/${spaceId}`} key={spaceId} className={cn.row}>
            <div className={cn.container}>
              <Badge badge={badge} />
              <p className={cn.title}>{name}</p>
            </div>
            <div className={cn.container}>
              <Label color="grey">{type}</Label>
              <Link className={cn.settings} to={`/space/${spaceId}/settings`}>
                <SettingsOutline style={cn.icon} />
              </Link>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
