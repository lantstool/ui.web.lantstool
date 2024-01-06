// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { generateSeedPhrase } from 'near-seed-phrase';
import { utils } from 'near-api-js';
import { InputGroup } from '../../../../../../../general/InputGroup/InputGroup.tsx';

const generateImplicitAccount = () => {
  const result = generateSeedPhrase();

  result.accountId = Buffer.from(utils.PublicKey.fromString(result.publicKey).data).toString('hex');

  return result;
};

export const NewImplicitAccount = ({ form }: any) => {
  const { register, setValue } = form;

  const onClick = () => {
    const { accountId, publicKey, seedPhrase, secretKey: privateKey } = generateImplicitAccount();

    setValue('receiver.newImplicit.accountId', accountId);
    setValue('receiver.newImplicit.publicKey', publicKey);
    setValue('receiver.newImplicit.seedPhrase', seedPhrase);
    setValue('receiver.newImplicit.privateKey', privateKey);
  };

  return (
    <>
      <InputGroup register={register} name="receiver.newImplicit.accountId" label="Account Id" />
      <InputGroup
        register={register}
        name="receiver.newImplicit.publicKey"
        label="Public Key"
        disabled
      />
      <InputGroup
        register={register}
        name="receiver.newImplicit.seedPhrase"
        label="Seed Phrase"
        disabled
      />
      <InputGroup
        register={register}
        name="receiver.newImplicit.privateKey"
        label="Private Key"
        disabled
      />
      <button onClick={onClick} type="button">
        Generate Account Id
      </button>
    </>
  );
};
