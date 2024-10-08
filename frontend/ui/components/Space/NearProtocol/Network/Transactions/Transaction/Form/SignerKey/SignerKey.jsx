import { useWatch } from 'react-hook-form';
import { useStoreEffect } from '../../../../../../../../../../react-vault/index.js';
import { useState } from 'react';
import { Option } from '../_general/Option/Option.jsx';
import { SelectHeadLabel } from '../_general/SelectHeadLabel/SelectHeadLabel.jsx';
import { FormSelectGroup } from '../../../../../../../_general/FormSelectGroup/FormSelectGroup.jsx';
import { useDropdownOptions } from './useDropdownOptions.js';

export const SignerKey = ({ form }) => {
  const { control } = form;

  const options = useDropdownOptions(control);
  const signerKey = useWatch({ control, name: 'signer.publicKey' });

  // useEffect(() => {
  //   getOptions(accountId, getAccessKeyList, getKeys, setOptions);
  // }, [accountId]);

  // const onChange = (field) => (event) => {
  //   field.onChange(event);
  //   if (signerKey?.value !== event?.value) {
  //     form.setValue('actions', []);
  //   }
  // };s

  // if (!accountId) return null;

  return (
    <FormSelectGroup
      name="signer.publicKey"
      control={control}
      // onChange={onChange}
      options={options}
      isClearable={true}
      components={{ Option }}
    >
      {/*<SelectHeadLabel text="Access Key" permission={signerKey} />*/}
    </FormSelectGroup>
  );
};
