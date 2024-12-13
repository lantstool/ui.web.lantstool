import { useStoreEffect, useStoreAction, useStoreState } from '@react-vault';
import { Button } from '../../../../../../../_general/Button/Button.jsx';
import { HistoryOutline } from '../../../../../../../_general/icons/HistoryOutline.jsx';
import { SaveOutline } from '../../../../../../../_general/icons/SaveOutline.jsx';
import { useParams } from 'react-router-dom';
import { ArrowRightOutline } from '../../../../../../../_general/icons/ArrowRightOutline.jsx';
import { Tooltip } from '../../../../../../../_general/Tooltip/Tooltip.jsx';
import { useIsFormHasChanges } from './useIsFormHasChanges.js';
import cn from './ActionBar.module.scss';

export const ActionBar = ({ form, transaction }) => {
  const { spaceId, networkId, transactionId } = useParams();

  const setResult = useStoreAction((store) => store.nearProtocol.transactions.setResult);
  const sendOne = useStoreEffect((store) => store.nearProtocol.transactions.sendOne);
  const saveChanges = useStoreEffect((store) => store.nearProtocol.transactions.saveChanges);
  const revertChanges = useStoreEffect((store) => store.nearProtocol.transactions.revertChanges);
  const txResult = useStoreState(
    (store) => store.nearProtocol.transactions.results[transactionId],
    [transactionId],
  );
  const hasChanges = useIsFormHasChanges(form, transaction);

  const onSubmit = form.handleSubmit((formValues) => {
    sendOne({ formValues, spaceId, networkId, transactionId });
  });

  const revert = () => revertChanges({ form, transactionId });
  const save = () => saveChanges({ form, transactionId });
  const openResult = () => setResult({ transactionId, isOpen: true });

  return (
    <div className={cn.actionBar}>
      <div className={cn.container}>
        <Tooltip disabled={!hasChanges} arrow={false} content="Revert changes" placement="top">
          <Button
            disabled={!hasChanges}
            size="medium"
            onClick={revert}
            color="tertiary"
            IconLeft={HistoryOutline}
          />
        </Tooltip>
        <Tooltip disabled={!hasChanges} arrow={false} content="Save changes" placement="top">
          <Button
            disabled={!hasChanges}
            size="medium"
            onClick={save}
            color="tertiary"
            IconLeft={SaveOutline}
          />
        </Tooltip>
        <hr className={cn.border} />
        <Button size="medium" onClick={onSubmit}>
          Send
        </Button>
      </div>
      {Boolean(txResult) && (
        <>
          <hr className={cn.secondBorder} />
          <div className={cn.container}>
            <Button
              size="medium"
              color="tertiary"
              onClick={openResult}
              IconRight={ArrowRightOutline}
            >
              Open result
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
