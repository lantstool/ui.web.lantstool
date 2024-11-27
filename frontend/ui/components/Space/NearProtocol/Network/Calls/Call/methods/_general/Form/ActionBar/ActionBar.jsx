import { useStoreEffect, useStoreAction, useStoreState } from '@react-vault';
import { Button } from '../../../../../../../../../_general/Button/Button.jsx';
import { useIsFormHasChanges } from './useIsFormHasChanges.js';
import { HistoryOutline } from '../../../../../../../../../_general/icons/HistoryOutline.jsx';
import { SaveOutline } from '../../../../../../../../../_general/icons/SaveOutline.jsx';
import { useParams } from 'react-router-dom';
import { ArrowRightOutline } from '../../../../../../../../../_general/icons/ArrowRightOutline.jsx';
import cn from './ActionBar.module.scss';

export const ActionBar = ({ form, call }) => {
  const { spaceId, networkId, callId } = useParams();
  const setResult = useStoreAction((store) => store.nearProtocol.calls.setResult);
  const saveChanges = useStoreEffect((store) => store.nearProtocol.calls.saveChanges);
  const revertChanges = useStoreEffect((store) => store.nearProtocol.calls.revertChanges);
  const executeOne = useStoreEffect((store) => store.nearProtocol.calls.executeOne);
  const result = useStoreState((store) => store.nearProtocol.calls.results[callId], [callId]);
  const hasChanges = useIsFormHasChanges(form, call);

  const revert = () => revertChanges({ form, callId });
  const save = () => saveChanges({ form, callId });
  const openResult = () => setResult({ callId, isOpen: true });

  const onSubmit = form.handleSubmit((formValues) => {
    executeOne({ spaceId, networkId, callId, formValues });
  });

  return (
    <div className={cn.actionBar}>
      <div className={cn.container}>
        {hasChanges && (
          <>
            <Button size="small" onClick={revert} color="secondary" IconLeft={HistoryOutline} />
            <Button size="small" onClick={save} color="secondary" IconLeft={SaveOutline} />
            <hr className={cn.border} />
          </>
        )}

        <Button size="medium" onClick={onSubmit}>
          Send
        </Button>
      </div>

      {Boolean(result) && (
        <>
          <hr className={cn.secondBorder} />
          <div className={cn.container}>
            <Button
              size="small"
              color="secondary"
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
