import { useParams } from 'react-router-dom';
import { useStoreEffect } from '../../../../../../../../../../../../react-vault/index.js';
import cn from './Duplicate.module.scss';

export const Duplicate = ({ closeMenu }) => {
  const { spaceId, networkId, transactionId } = useParams();
  const duplicateOne = useStoreEffect((store) => store.nearProtocol.transactions.duplicateOne);

  const onClick = () => duplicateOne({ spaceId, networkId, transactionId, closeMenu });

  return (
    <button className={cn.button} onClick={onClick}>
      <p className={cn.buttonText}>Duplicate</p>
    </button>
  );
};
