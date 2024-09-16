import cn from './Result.module.css';
import { Button } from '../../../general/Button/Button.jsx';
import { jsonLanguage } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';
import { useStoreAction, useStoreEffect, useStoreState } from '../../../../../../../../react-vault/index.js';
import { BackIcon } from '../../../../../../../assets/components/BackIcon.jsx';

// TODO Move to utils
const getFormattedJSON = (json) => JSON.stringify(json, null, 2);

const getResultValue = (transaction) => {
  const currentResult = transaction.results.currentResult;
  return transaction.results.records.find((el) => el.resultId === currentResult)?.result;
};

const getValues = (transaction, temporaryFormValues) => {
  const txValues = temporaryFormValues ? temporaryFormValues : transaction;

  return {
    transactionId: txValues.transactionId,
    signerId: txValues.signerId,
    signerKey: txValues.signerKey,
    receiver: txValues.receiver,
    actions: txValues.actions,
    results: txValues.results,
  };
};

const getResultStatus = (status) => {
  try {
    if (status.SuccessValue) {
      return getFormattedJSON({ SuccessValue: atob(status.SuccessValue) });
    }
    return getFormattedJSON(status);
  } catch (e) {
    return 'Error during parsing result';
  }
};

export const Result = ({ transaction }) => {
  const sendTransaction = useStoreEffect((store) => store.transactions.onSendTransaction);
  const setOpenResult = useStoreAction((store) => store.transactions.setOpenResult);
  const result = getResultValue(transaction);
  const temporaryFormValues = useStoreState(
    (store) => store.transactions.temporaryFormValues[transaction.transactionId],
  );

  const txValues = getValues(transaction, temporaryFormValues);
  //
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
            {result.status ? (
              <>
                <CodeMirror
                  readOnly={true}
                  value={getResultStatus(result.status)}
                  extensions={[jsonLanguage]}
                />
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
