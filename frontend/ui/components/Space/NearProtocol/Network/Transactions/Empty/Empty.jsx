import { useStoreEffect } from '../../../../../../../../react-vault/index.js';
import { useParams } from 'react-router-dom';
import { Button } from '../../../../../_general/Button/Button.jsx';
import { useNavigate } from 'react-router-dom';
import { TransactionFileBold } from '../../../../../_general/icons/TransactionFileBold.jsx';
import cn from './Empty.module.scss';

export const Empty = () => {
  const { spaceId, networkId } = useParams();
  const createTx = useStoreEffect((store) => store.nearProtocol.transactions.create);
  const navigate = useNavigate();

  const onClick = () => {
    createTx({ spaceId, networkId, navigate });
  };

  return (
    <div className={cn.empty}>
      <div className={cn.wrapper}>
        <TransactionFileBold style={cn.icon} />
        <h2 className={cn.text}>
          Looks like you need to add something here.
          <br />
          Get a move on.
        </h2>
      </div>
      <Button onClick={onClick} size="large">
        Create transaction
      </Button>
    </div>
  );
};
