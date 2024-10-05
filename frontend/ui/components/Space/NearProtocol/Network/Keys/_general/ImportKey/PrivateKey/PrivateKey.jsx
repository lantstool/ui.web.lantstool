import { useParams } from 'react-router-dom';
import { ModalGroup } from '../../../../../../../_general/ModalGroup/ModalGroup.jsx';
import cn from './PrivateKey.module.scss';
import { TextareaGroup } from '../../../../../../../_general/TextareaGroup/TextareaGroup.jsx';
import { useForm, useWatch } from 'react-hook-form';
import { useStoreEffect } from '../../../../../../../../../../react-vault/index.js';
import { Button } from '../../../../_general/Button/Button.jsx';
import addIcon from '../../../../../../../../assets/addIcon.svg';
import { MessageGroup } from '../_general/MessageGroup/MessageGroup.jsx';

export const PrivateKey = ({ isOpen, close, setStep }) => {
  const { spaceId, networkId } = useParams();
  const importFromPrivateKey = useStoreEffect(
    (store) => store.nearProtocol.keys.importFromPrivateKey,
  );
  // TODO: When on Submit: send validation request to the backend when instead of fetching all data locally
  // const schema = useMemo(() => createSchema(records), [records]);

  const form = useForm({
    // resolver: yupResolver(schema),
    defaultValues: {
      publicKey: null,
      privateKey: null,
      seedPhrase: null,
    },
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = form;

  const publicKey = useWatch({ control, name: 'publicKey' });

  const prevStep = () => {
    setStep('selectImport');
  };

  const onSubmit = (formValues) => {
    importFromPrivateKey({ formValues, spaceId, networkId, reset });
  };

  return (
    <ModalGroup
      isOpen={isOpen}
      closeModal={close}
      text="Import from Private Key"
      prevStep={prevStep}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cn.container}>
          <h2 className={cn.title}>
            Make sure you type the correct ed25519 private key without extra spaces or symbols
          </h2>
          <div className={cn.privateWrapper}>
            <TextareaGroup
              register={register}
              name="privateKey"
              rows={4}
              errors={errors?.privateKey?.message}
              label="Private key"
            />
          </div>
          <MessageGroup
            errors={errors?.privateKey}
            publicKey={publicKey}
            dirtyFields={dirtyFields.privateKey}
          />
          <div className={cn.buttonWrapper}>
            <Button type="submit" text="Import" src={addIcon} />
          </div>
        </div>
      </form>
    </ModalGroup>
  );
};
