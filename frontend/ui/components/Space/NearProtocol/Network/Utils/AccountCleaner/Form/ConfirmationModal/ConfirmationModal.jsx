import { DeleteModal } from '@gc/modals/DeleteModal/DeleteModal.jsx';
import { useStoreEffect } from '@react-vault';
import { useParams } from 'react-router-dom';
import { texts } from './texts.jsx';

export const ConfirmationModal = ({ closeModal, form }) => {
  const runAccountCleaner = useStoreEffect((store) => store.nearProtocol.utils.runAccountCleaner);
  const { spaceId, networkId } = useParams();
  const formValues = form.getValues();

  const text = texts[formValues.mode]({
    accountId: formValues.signerId.value,
  });

  const submit = () => {
    console.log('submit');
    closeModal();
    runAccountCleaner({
      spaceId,
      networkId,
      formValues,
    });
  };

  return <DeleteModal close={closeModal} submit={submit} text={text} />;
};
