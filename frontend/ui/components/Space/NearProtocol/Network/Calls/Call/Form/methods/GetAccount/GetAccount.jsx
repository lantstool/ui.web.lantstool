import { useForm } from 'react-hook-form';
import { useEffect, useLayoutEffect } from 'react';
import { useStoreState, useStoreAction } from '@react-vault';
import { Dropdown } from '../../../../../../../../_general/Dropdown/Dropdown.jsx';
import { useAccountsOptions } from '../../../../../_general/hooks/useAccountsOptions.js';
import { useFieldsDefaultValues } from '../../_general/hooks/useFieldsDefaultValues.js';
import { BlockTarget } from '../../_general/BlockTarget/BlockTarget.jsx';
import { SelectMethod } from '../../SelectMethod/SelectMethod.jsx';
import { Topbar } from '../../Topbar/Topbar.jsx';

export const GetAccount = ({ call, method, setMethod }) => {
  const { callId, body } = call;
  const draft = useStoreState((store) => store.nearProtocol.calls.drafts[callId]);
  const setDraft = useStoreAction((store) => store.nearProtocol.calls.setDraft);
  const options = useAccountsOptions();

  const form = useForm({ defaultValues: body });
  const { control } = form;

  const watchAllFields = form.watch();
  console.log(watchAllFields);
  // useFieldsDefaultValues(form, {
  //   accountId: '',
  //   blockTarget: 'latest',
  //   finality: { value: 'final', label: 'Final' },
  //   blockId: '',
  // });

  useEffect(() => {
    form.reset(body);

    if (draft) {
      form.reset(draft, { keepDefaultValues: true });
      // setMethod(draft.method);
    }

    return () => {
      console.log('Unmount GetAccount draft:', form.getValues());
      setDraft({ callId, draft: form.getValues() });
    };
  }, [callId]);

  return (
    <>
      <Topbar call={call} form={form} />
      <SelectMethod form={form} method={method} setMethod={setMethod} callId={callId} />
      {/*<Dropdown*/}
      {/*  name="params.accountId"*/}
      {/*  label="Account Id"*/}
      {/*  control={control}*/}
      {/*  options={options}*/}
      {/*  isSearchable*/}
      {/*  isClearable*/}
      {/*  creatableSelect*/}
      {/*/>*/}
      {/*<BlockTarget form={form} />*/}
    </>
  );
};
