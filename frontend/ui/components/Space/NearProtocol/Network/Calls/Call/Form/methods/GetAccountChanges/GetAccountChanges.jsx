import { useStoreAction, useStoreState } from '@react-vault';
import { useEffect } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { Dropdown } from '../../../../../../../../_general/Dropdown/Dropdown.jsx';
import { useAccountsOptions } from '../../../../../_general/hooks/useAccountsOptions.js';
import { useFieldsDefaultValues } from '../../_general/hooks/useFieldsDefaultValues.js';
import { BlockTarget } from '../../_general/BlockTarget/BlockTarget.jsx';
import { SelectMethod } from '../../SelectMethod/SelectMethod.jsx';
import { Topbar } from '../../Topbar/Topbar.jsx';
import { AccountIds } from './AccountIds.jsx';

export const GetAccountChanges = ({ call, method, setMethod }) => {
  const { callId, body } = call;
  const draft = useStoreState((store) => store.nearProtocol.calls.drafts[callId]);
  const setDraft = useStoreAction((store) => store.nearProtocol.calls.setDraft);
  const form = useForm({ defaultValues: call.body });
  const { control } = form;

  // useFieldsDefaultValues(form, {
  //   accountIds: [{ accountId: '' }],
  //   blockTarget: 'specific',
  //   finality: { value: 'final', label: 'Final' },
  //   blockId: '',
  // });
  console.log('GetAccountChanges draft render:', draft);
  useEffect(() => {
    console.log('GetAccountChanges draft useEffect:', draft);
    form.reset(body);
    // setMethod({
    //   value: 'getAccountChanges',
    //   label: 'Get Account Changes',
    // });
    // console.log(body);

    if (draft) {
      form.reset(draft, { keepDefaultValues: true });
    }

    return () => {
      console.log('Unmount GetAccountChanges');
      setDraft({ callId, draft: form.getValues() });
    };
  }, [callId]);

  return (
    <>
      <Topbar call={call} form={form} />
      <SelectMethod form={form} method={method} setMethod={setMethod} callId={callId} />
      {/*<AccountIds form={form} />*/}
      <BlockTarget form={form} />
    </>
  );
};
