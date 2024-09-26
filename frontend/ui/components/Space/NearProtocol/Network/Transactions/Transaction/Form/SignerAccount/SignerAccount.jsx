import { useParams } from 'react-router-dom';
import { useStoreEffect } from '../../../../../../../../../../react-vault/index.js';
import { useEffect, useState } from 'react';
import cn from './SignerAccount.module.scss';
import { FormSelectGroup } from '../../../../../../../_general/FormSelectGroup/FormSelectGroup.jsx';
import { useWatch } from 'react-hook-form';

const getOptions = async (getIds, setOptions, spaceId, networkId) => {
  const accounts = await getIds({ spaceId, networkId });
  const options = accounts.map((accountId) => ({
    value: accountId,
    label: accountId,
  }));
  setOptions(options);
};

export const SignerAccount = ({ form }) => {
  const { spaceId, networkId } = useParams();
  const { control, setValue } = form;
  const getIds = useStoreEffect((store) => store.nearProtocol.accounts.getIds);
  const [options, setOptions] = useState([]);
  const accountId = useWatch({ control, name: 'signerId.value' });

  useEffect(() => {
    getOptions(getIds, setOptions, spaceId, networkId);
  }, []);

  const onChange = (field) => (event) => {
    field.onChange(event);
    setValue('signerKey', '');
    setValue('actions', []);
  };

  return (
    <div className={cn.signerAccount}>
      <FormSelectGroup
        name="signerId"
        isSearchable={true}
        isClearable={true}
        onChange={onChange}
        control={control}
        options={options}
        creatableSelect={true}
        accountId={accountId}
        label="Account Id"
      />
    </div>
  );
};
