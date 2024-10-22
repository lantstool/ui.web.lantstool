import { SideMenu } from './SideMenu/SideMenu.jsx';
import { Button } from '../../../../../../../../_general/Button/Button.jsx';
import { HistoryOutline } from '../../../../../../../../_general/icons/HistoryOutline.jsx';
import { SaveOutline } from '../../../../../../../../_general/icons/SaveOutline.jsx';
import { EditName } from './SideMenu/EditName/EditName.jsx';
import { useParams } from 'react-router-dom';
import { useStoreAction, useStoreEffect, useStoreState } from '@react-vault';
import { useFormState } from 'react-hook-form';
import cn from './Topbar.module.scss';

/*
  Known bug – the topbar incorrectly displays the “revert/save” buttons in the
  following rare case:
  1.The user navigates to the Call page where any RPC method is selected, while
    the rest of the fields are empty.
  2.The user deletes the method and then reselects the same one.

  Visually, nothing seems to have changed, but the form considers itself to be dirty.
  The bug is very minor, so there are no plans to fix it.
*/

export const Topbar = ({ form, call }) => {
  const { spaceId, networkId, callId } = useParams();
  const setResult = useStoreAction((store) => store.nearProtocol.calls.setResult);
  const saveChanges = useStoreEffect((store) => store.nearProtocol.calls.saveChanges);
  const revertChanges = useStoreEffect((store) => store.nearProtocol.calls.revertChanges);
  const executeOne = useStoreEffect((store) => store.nearProtocol.calls.executeOne);
  const result = useStoreState((store) => store.nearProtocol.calls.results[callId]);

  const { isDirty } = useFormState({ control: form.control });

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
        <SideMenu call={call} />
        {isDirty && (
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
