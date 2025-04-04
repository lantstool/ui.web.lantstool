import { useStoreEffect, useStoreAction, useStoreState } from '@react-vault';
import { Button } from '../../../../../../../../../../_general/Button/Button.jsx';
import { useIsFormHasChanges } from './useIsFormHasChanges.js';
import { useParams } from 'react-router-dom';
import { Tooltip } from '../../../../../../../../../../_general/Tooltip/Tooltip.jsx';
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
        <Tooltip disabled={!hasChanges} arrow={false} content="Revert changes" placement="top">
          <Button
            disabled={!hasChanges}
            size="medium"
            onClick={revert}
            color="tertiary"
            iconLeftStyles={cn.historyIcon}
          />
        </Tooltip>
        <Tooltip disabled={!hasChanges} arrow={false} content="Save changes" placement="top">
          <Button
            disabled={!hasChanges}
            size="medium"
            onClick={save}
            color="tertiary"
            iconLeftStyles={cn.saveIcon}
          />
        </Tooltip>
        <hr className={cn.border} />
        <Button size="medium" onClick={onSubmit}>
          Send
        </Button>
      </div>
      {Boolean(result) && (
        <>
          <hr className={cn.secondBorder} />
          <div className={cn.container}>
            <Button
              size="medium"
              color="tertiary"
              onClick={openResult}
              iconRightStyles={cn.arrowRightIcon}
            >
              Open result
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
