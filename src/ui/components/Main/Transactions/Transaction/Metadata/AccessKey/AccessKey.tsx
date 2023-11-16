import { InputGroup } from '../../../../../general/InputGroup/InputGroup.tsx';

export const AccessKey = ({ register, signerType }: any) => {
  return (
    <fieldset style={{ borderRadius: 8 }}>
      <legend>Access key</legend>

      <input
        {...register('signerKey.source')}
        type="radio"
        value="Manually"
        id="signerKey.source.manually"
      />
      <label htmlFor="signerKey.source.manually">Type manually</label>

      <input
        {...register('signerKey.source')}
        type="radio"
        value="Existing"
        id="signerKey.source.existing"
      />
      <label htmlFor="signerKey.source.existing">Select existing</label>

      {signerType?.source === 'Manually' && (
        <>
          <InputGroup register={register} name="signerKey.privateKey" label="Private Key" />
          <InputGroup
            register={register}
            name="signerKey.publicKey"
            label="Public Key"
            disabled={true}
          />
        </>
      )}
    </fieldset>
  );
};
