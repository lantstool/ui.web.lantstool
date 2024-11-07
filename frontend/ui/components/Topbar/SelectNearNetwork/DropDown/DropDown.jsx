import { Popper } from '../../_general/Popper/Popper.jsx';
import { CheckMarkOutline } from '../../../_general/icons/CheckmarkOutline.jsx';
import { Link } from 'react-router-dom';
import { useStoreState } from '@react-vault';
import { AddSquareOutline } from '../../../_general/icons/AddSquareOutline.jsx';
import { SettingsOutline } from '../../../_general/icons/SettingsOutline.jsx';
import cn from './DropDown.module.scss';

export const DropDown = ({ setOpen, isOpen, spaceId, networkId }) => {
  const ids = useStoreState((store) => store.nearProtocol.networks.ids);

  const closeMenu = () => setOpen(false);

  return (
    <Popper isOpen={isOpen} closeMenu={closeMenu}>
      <div className={cn.dropdown}>
        <div className={cn.container}>
          {ids.map((item) => (
            <Link
              to={`/space/${spaceId}/near-protocol/${item}`}
              onClick={closeMenu}
              className={cn.item}
              key={item}
            >
              <div className={cn.itemWrapper}>
                <p className={cn.title}>{item}</p>
              </div>
              <CheckMarkOutline style={item === networkId ? cn.icon : cn.hidden} />
            </Link>
          ))}
        </div>
        <hr className={cn.border} />
        <div className={cn.settings}>
          <Link
            to={`/space/${spaceId}/near-protocol/networks/create`}
            onClick={closeMenu}
            className={cn.settingItem}
          >
            <AddSquareOutline />
            Add network
          </Link>
          <Link
            to={`/space/${spaceId}/near-protocol/networks`}
            onClick={closeMenu}
            className={cn.settingItem}
          >
            <SettingsOutline />
            Manage networks
          </Link>
        </div>
      </div>
    </Popper>
  );
};
