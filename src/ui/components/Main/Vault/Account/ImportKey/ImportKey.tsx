// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Modal } from '../../../../general/Modal/Modal.tsx';
import { useRef, useState } from 'react';
import cn from './ImportKey.module.css';
import { useStoreEffect, useStoreState } from '../../../../../../react-vault';
import { useForm } from 'react-hook-form';
import { SignTx } from './SignTx/SignTx.tsx';
import { ImportType } from './ImportType/ImportType.tsx';
import { SeedPhrase } from './SeedPhrase/SeedPhrase.tsx';
import { schemaController } from './validation/schemaController.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { PrivateKey } from './PrivateKey/PrivateKey.tsx';

export const ImportKey = ({ accountId, list }: any) => {
  const [isOpen, setOpen]: any = useState(false);
  const [step, setStep] = useState('signTx');
  const onGetAccessKeyList = useStoreEffect((store: any) => store.vault.onGetAccessKeyList);
  const accessKeyList: any = useStoreState((state: any) => state.vault.accessKeyList);
  const ref1: any = useRef(null);
  const ref2: any = useRef(null);
  const schema: any = schemaController(step, accessKeyList, ref1, ref2, list);

  const form = useForm<any>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      type: null,
      privateKey: null,
      publicKey: null,
      seedPhrase: null,
    },
  });
  const { reset } = form;

  const openModal = () => {
    onGetAccessKeyList({ accountId });
    setOpen(true);
  };
  const closeModal = () => {
    clearTimeout(ref1.current);
    clearTimeout(ref2.current);
    setOpen(false);
    setStep('signTx');
    reset();
  };

  return (
    <>
      <button className={cn.buttonImport} onClick={openModal}>
        Import key
      </button>
      <Modal isOpen={isOpen} close={closeModal}>
        <div className={cn.container}>
          {step === 'signTx' && <SignTx form={form} closeModal={closeModal} setStep={setStep} />}
          {step === 'importType' && (
            <ImportType form={form} closeModal={closeModal} setStep={setStep} />
          )}
          {step === 'seedPhrase' && (
            <SeedPhrase
              closeModal={closeModal}
              form={form}
              setStep={setStep}
              accountId={accountId}
              ref1={ref1}
              ref2={ref2}
            />
          )}
          {step === 'privateKey' && (
            <PrivateKey
              closeModal={closeModal}
              form={form}
              setStep={setStep}
              accountId={accountId}
              ref1={ref1}
              ref2={ref2}
            />
          )}
        </div>
      </Modal>
    </>
  );
};
