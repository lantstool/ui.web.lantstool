import { SideMenu } from './SideMenu/SideMenu.jsx';
import { Button } from '../../../../../../../_general/Button/Button.jsx';
import { HistoryOutline } from '../../../../../../../_general/icons/HistoryOutline.jsx';
import { SaveOutline } from '../../../../../../../_general/icons/SaveOutline.jsx';
import { EditName } from './SideMenu/EditNameModal/EditName.jsx';
import { useParams } from 'react-router-dom';
import {
  useStoreAction,
  useStoreEffect,
  useStoreState,
} from '../../../../../../../../../../react-vault/index.js';
import { useFormState } from 'react-hook-form';
import cn from './Topbar.module.scss';

export const Topbar = ({ form, transaction }) => {
  const { spaceId, networkId, transactionId } = useParams();
  const setResult = useStoreAction((store) => store.nearProtocol.transactions.setResult);
  const sendOne = useStoreEffect((store) => store.nearProtocol.transactions.sendOne);
  const saveChanges = useStoreEffect((store) => store.nearProtocol.transactions.saveChanges);
  const revertChanges = useStoreEffect((store) => store.nearProtocol.transactions.revertChanges);
  const txResult = useStoreState((store) => store.nearProtocol.transactions.results[transactionId]);
  const { isDirty } = useFormState({ control: form.control });

  const onSubmit = form.handleSubmit((formValues) => {
    sendOne({ formValues, spaceId, networkId, transactionId });
  });

  const revert = () => revertChanges({ form, transactionId });
  const save = () => saveChanges({ form, transactionId });
  const openResult = () => setResult({ transactionId, isOpen: true });

  return (
    <div className={cn.topbar}>
      <div>
        <EditName transaction={transaction} />
      </div>
      <div className={cn.sideMenu}>
        <SideMenu transaction={transaction} />
        {isDirty && (
          <>
            <Button size="medium" onClick={revert} color="secondary" IconLeft={HistoryOutline} />
            <Button size="medium" onClick={save} color="secondary" IconLeft={SaveOutline}>
              Save
            </Button>
          </>
        )}
        {Boolean(txResult) && (
          <Button size="medium" color="secondary" onClick={openResult}>
            View result
          </Button>
        )}
        <Button size="medium" onClick={onSubmit}>
          Send transaction
        </Button>
      </div>
    </div>
  );
};
