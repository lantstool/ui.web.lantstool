import { useWatch } from 'react-hook-form';
import { SelectGroup } from '../../../../../../general/SelectGroup/SelectGroup.tsx';
import { useStoreState } from '../../../../../../../../react-vault';
import { useEffect } from 'react';

export const SelectKey = ({ form }: any) => {
  const { control, register, setValue } = form;
  const accounts: any = useStoreState((store: any) => store.vault.map);
  const signerAccountId = useWatch({ control, name: 'signer.accountId' });
  const options = useWatch({ control, name: 'signerKey.fromVault.options' });
  const publicKey = useWatch({ control, name: 'signerKey.fromVault.publicKey' });

  useEffect(() => {
    const account = accounts[signerAccountId];

    if (!account) {
      setValue('signerKey.fromVault.options', []);
      setValue('signerKey.fromVault.publicKey', '');
      setValue('signerKey.fromVault.privateKey', '');
      return;
    }

    const keys = account.list.map((pk: any) => {
      const { publicKey, type } = account.map[pk];
      const keyType = type === 'fullAccess' ? 'Full Access' : 'Function Call';
      return {
        value: publicKey,
        label: `${publicKey} - ${keyType}`,
      };
    });

    setValue('signerKey.fromVault.options', keys);
  }, [accounts, setValue, signerAccountId]);

  useEffect(() => {
    setValue('signerKey.fromVault.privateKey', ''); // TODO change structure
  }, [publicKey, setValue]);

  return (
    <SelectGroup
      register={register}
      name="signerKey.fromVault.publicKey"
      options={options}
      label="Public Key"
    />
  );
};
