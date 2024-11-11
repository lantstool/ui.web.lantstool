import { Popper } from '../../_general/Popper/Popper.jsx';
import { CheckMarkOutline } from '../../../_general/icons/CheckmarkOutline.jsx';
import { Link } from 'react-router-dom';
import { useStoreState } from '@react-vault';
import { AddSquareOutline } from '../../../_general/icons/AddSquareOutline.jsx';
import { SettingsOutline } from '../../../_general/icons/SettingsOutline.jsx';
import { Badge } from '../../../_general/Badge/Badge.jsx';
import cn from './DropDown.module.scss';

export const DropDown = ({ setOpen, isOpen, spaceId }) => {
  const ids = useStoreState((store) => store.spaces.ids);
  const records = useStoreState((store) => store.spaces.records);

  const closeMenu = () => setOpen(false);

  return (
    <Popper isOpen={isOpen} closeMenu={closeMenu}>
      <div className={cn.dropdown}>
        <div className={cn.container}>
          {ids.map((item) => (
            <Link to={`/space/${item}`} onClick={closeMenu} className={cn.item} key={item}>
              <div className={cn.itemWrapper}>
                <Badge badge={records[item].badge} />
                <p className={cn.title}>{records[item].name}</p>
              </div>
              <CheckMarkOutline style={records[item].spaceId === spaceId ? cn.icon : cn.hidden} />
            </Link>
          ))}
        </div>
        <hr className={cn.border} />
        <div className={cn.settings}>
          <Link to={'/spaces/create'} onClick={closeMenu} className={cn.settingItem}>
            <AddSquareOutline />
            Create new space
          </Link>
          <Link to={'/spaces'} onClick={closeMenu} className={cn.settingItem}>
            <SettingsOutline />
            Manage spaces
          </Link>
        </div>
      </div>
    </Popper>
  );
};
