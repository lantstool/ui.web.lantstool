import { Popper } from '@gc/Popper/Popper.jsx';
import { Link } from 'react-router-dom';
import { useStoreState } from '@react-vault';
import cn from './DropDown.module.scss';

export const DropDown = ({ setOpen, isOpen, spaceId, networkId, anchorEl }) => {
  const ids = useStoreState((store) => store.nearProtocol.networks.ids);

  const closeMenu = () => setOpen(false);

  return (
    <Popper isOpen={isOpen} closeMenu={closeMenu} position="right" anchorEl={anchorEl}>
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
              <span className={item === networkId ? cn.icon : cn.hidden} />
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
            <span className={cn.addIcon} />
            Add network
          </Link>
          <Link
            to={`/space/${spaceId}/near-protocol/networks`}
            onClick={closeMenu}
            className={cn.settingItem}
          >
            <span className={cn.iconSettings} />
            Manage networks
          </Link>
        </div>
      </div>
    </Popper>
  );
};
