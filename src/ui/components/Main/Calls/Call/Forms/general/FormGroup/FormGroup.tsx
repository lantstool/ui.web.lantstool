import cn from './FormGroup.module.css';
import cnm from 'classnames';
import { Footer } from '../Footer/Footer.tsx';
import { useStoreAction, useStoreState } from '../../../../../../../../react-vault';
import { useEffect } from 'react';

export const FormGroup = ({ children, call, form, formDefaultValues }) => {
  const setOpenResult: any = useStoreAction((store: any) => store.calls.setOpenResult);
  const temporaryFormValues: any = useStoreState(
    (store: any) => store.calls.temporaryFormValues[call.callId],
  );
  const putTemporaryFormValues = useStoreAction((store: any) => store.calls.putTemporaryFormValues);

  useEffect(() => {
    form.reset(formDefaultValues);
    if (temporaryFormValues)
      form.reset({ ...temporaryFormValues, results: call.results }, { keepDefaultValues: true });
    return () => {
      putTemporaryFormValues({
        values: form.getValues(),
        callId: call.callId,
      });
    };
  }, []);

  const isResults = call.results?.records.length > 0;
  const toResult = () => {
    setOpenResult({ callId: call.callId, isOpen: true });
  };

  return (
    <div className={cn.container}>
      <div className={cn.formScrollWrapper}>
        <div className={cnm(cn.topNav, isResults && cn.topNavActive)}>
          {isResults && (
            <button className={cn.resultBtn} onClick={toResult}>
              Result
            </button>
          )}
        </div>
        <form className={cnm(cn.form, isResults && cn.formWithoutNav)}>
          <h3 className={cn.title}>{call.type}</h3>
          {children}
        </form>
      </div>
      <Footer form={form} />
    </div>
  );
};
