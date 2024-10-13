import { Modal } from '../../../../../../../../_general/Modal/Modal.jsx';
import { useStoreEffect } from '../../../../../../../../../../../react-vault/index.js';
import { CloseButton } from '../../../../../_general/CloseButton/CloseButton.jsx';
import { Title } from '../../../../../_general/Title/Title.jsx';
import { Subtitle } from '../../../../../_general/Subtitle/Subtitle.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../../../_general/Button/Button.jsx';
import cn from './RemoveModal.module.scss';

export const RemoveModal = ({ closeModal }) => {
  const { spaceId, networkId, transactionId } = useParams();
  const navigate = useNavigate();
  const removeOne = useStoreEffect((store) => store.nearProtocol.transactions.removeOne);

  const remove = () => {
    removeOne({ spaceId, networkId, transactionId, navigate, closeModal });
  };

  return (
    <Modal isOpen close={closeModal}>
      <div className={cn.container}>
        <div className={cn.header}>
          <Title text="Remove transaction" />
          <CloseButton close={closeModal} />
        </div>
        <Subtitle
          text="Are you sure to remove this transaction? It will also remove all data from this
          transaction."
        />
        <Button text="Remove" onClick={remove} style="secondary" />
      </div>
    </Modal>
  );
};
