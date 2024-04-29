import cn from './Result.module.css';
import { Button } from '../../../general/Button/Button.tsx';
import { jsonLanguage } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';
import { useStoreAction, useStoreEffect, useStoreState } from '../../../../../../react-vault';
import { BackIcon } from '../../../../../assets/components/BackIcon.tsx';

// TODO Move to utils
const getFormattedJSON = (json: string) => JSON.stringify(json, null, 2);

const getResultValue = (transaction: any) => {
  const currentResult = transaction.results.currentResult;
  return transaction.results.records.find((el: any) => el.resultId === currentResult)?.result;
};

const getValues = (transaction: any) => {
  return {
    transactionId: transaction.transactionId,
    signerId: transaction.signerId,
    signerKey: transaction.signerKey,
    receiver: transaction.receiver,
    actions: transaction.actions,
    results: transaction.results,
  };
};

export const Result = ({ transaction }: any) => {
  const sendTransaction = useStoreEffect((store: any) => store.transactions.onSendTransaction);
  const setOpenResult: any = useStoreAction((store: any) => store.transactions.setOpenResult);
  const result = getResultValue(transaction);
  const temporaryFormValues: any = useStoreState(
    (store: any) => store.transactions.temporaryFormValues[transaction.transactionId],
  );
  const txValues = getValues(temporaryFormValues);

  const resend = () => {
    sendTransaction({ formValues: txValues });
  };
  const closeResult = () => {
    setOpenResult({ transactionId: transaction.transactionId, isOpen: false });
  };

  return (
    <div>
      <div className={cn.container}>
        <div className={cn.topNav}>
          <button className={cn.backBtn} onClick={closeResult}>
            <BackIcon style={cn.icon} />
          </button>
        </div>
        {transaction.results.isLoading ? (
          <p className={cn.loader}>Loading...</p>
        ) : (
          <>
            <h3 className={cn.title}>Result</h3>
            {getFormattedJSON(result.status) ? (
              <>
                {/*  @ts-ignore */}
                <pre className={cn.subtitle} style={{ textWrap: 'wrap' }}>
                  {getFormattedJSON(result.status)}
                </pre>
                <h3 className={cn.title}>ID</h3>
                <p className={cn.subtitle}>{result?.transaction_outcome?.id}</p>
                <h3 className={cn.title}>Details</h3>
                <CodeMirror
                  readOnly={true}
                  value={getFormattedJSON(result)}
                  extensions={[jsonLanguage]}
                />
              </>
            ) : (
              <p className={cn.error}>{result}</p>
            )}
          </>
        )}
      </div>
      <div className={cn.footer}>
        <div className={cn.closeBtn}>
          <Button onClick={closeResult} text="Close" style="outlined" />
        </div>
        <div className={cn.resendBtn}>
          {!transaction.results.isLoading && (
            <Button onClick={resend} text="Resend" style="secondary" />
          )}
        </div>
      </div>
    </div>
  );
};
