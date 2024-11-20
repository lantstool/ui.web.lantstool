import { SideMenu } from './SideMenu/SideMenu.jsx';
import { Button } from '../../../../../../../../../_general/Button/Button.jsx';
import { HistoryOutline } from '../../../../../../../../../_general/icons/HistoryOutline.jsx';
import { SaveOutline } from '../../../../../../../../../_general/icons/SaveOutline.jsx';
import { EditName } from './SideMenu/EditName/EditName.jsx';
import { useParams } from 'react-router-dom';
import { useStoreAction, useStoreEffect, useStoreState } from '@react-vault';
import { RpcType } from './RpcType/RpcType.jsx';
import { useIsFormHasChanges } from './useIsFormHasChanges.js';
import cn from './Topbar.module.scss';

export const Topbar = ({ form, call }) => {
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
    <div className={cn.topbar}>
      <div>
        <EditName call={call} />
      </div>
      <div className={cn.sideMenu}>
        <RpcType call={call} />
        <SideMenu call={call} />
        {hasChanges && (
          <>
            <Button size="medium" onClick={revert} color="secondary" IconLeft={HistoryOutline} />
            <Button size="medium" onClick={save} color="secondary" IconLeft={SaveOutline}>
              Save
            </Button>
          </>
        )}
        {Boolean(result) && (
          <Button size="medium" color="secondary" onClick={openResult}>
            View result
          </Button>
        )}
        <Button size="medium" onClick={onSubmit}>
          Send
        </Button>
      </div>
    </div>
  );
};
