import { NavLink, useParams } from 'react-router-dom';
import { Menu } from './Menu/Menu.jsx';
import { EditName } from '../../../../../_general/EditName/EditName.jsx';
import { useStoreEffect } from '@react-vault';
import cnm from 'classnames';
import cn from './Call.module.scss';

export const Call = ({ item, wrapperProps }) => {
  const updateOneName = useStoreEffect((store) => store.nearProtocol.calls.updateOneName);
  const { callId } = useParams();

  const isActive = item?.callId === callId && callId;

  const { depth } = wrapperProps;

  const updateName = (formValues) => {
    updateOneName({ formValues, callId: item?.callId });
  };

  return (
    <>
      <NavLink
        to={item.callId}
        className={cnm(cn.call, depth === 1 && cn.children, isActive && cn.active)}
      >
        <EditName name={item.name} itemId={item.callId} updateName={updateName} styles={cn.title} />
        <Menu item={item} />
      </NavLink>
    </>
  );
};
