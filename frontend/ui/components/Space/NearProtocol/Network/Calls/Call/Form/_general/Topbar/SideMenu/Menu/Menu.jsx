import cnm from 'classnames';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { CopyOutline } from '../../../../../../../../../../_general/icons/CopyOutline.jsx';
import { TrashBinOutline } from '../../../../../../../../../../_general/icons/TrashBinOutline.jsx';
import cn from './Menu.module.scss';

const popupPosition = {
  bottomRight: { popup: cn.positionRight },
  bottomLeft: { popup: cn.positionLeft },
  bottom: { popup: cn.positionCenter },
};

const getType = (position) => popupPosition[position] || popupPosition.center;

export const Menu = ({ closeMenu, position }) => {
  const { popup } = useMemo(() => getType(position), [position]);
  const { spaceId, networkId, callId } = useParams();
  const navigate = useNavigate();
  const removeOne = useStoreEffect((store) => store.nearProtocol.calls.removeOne);
  const duplicateOne = useStoreEffect((store) => store.nearProtocol.calls.duplicateOne);

  const remove = () => removeOne({ spaceId, networkId, callId, navigate, closeMenu });
  const duplicate = () => duplicateOne({ spaceId, networkId, callId, closeMenu });

  return (
    <>
      <div className={cnm(cn.popup, popup)}>
        <div className={cn.buttonWrapper}>
          <button className={cn.button} onClick={duplicate}>
            <CopyOutline style={cn.icon} />
            Duplicate
          </button>
          <button className={cn.button} onClick={remove}>
            <TrashBinOutline style={cn.icon} />
            Delete
          </button>
        </div>
      </div>
      <div className={cn.backdrop} onClick={closeMenu} />
    </>
  );
};
