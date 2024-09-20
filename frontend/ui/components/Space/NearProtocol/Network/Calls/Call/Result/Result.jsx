import cn from './Result.module.css';
import { useStoreAction, useStoreEffect, useStoreState } from '../../../../../../../../../react-vault/index.js';
import { BackIcon } from '../../../../../../../assets/components/BackIcon.jsx';
import CodeMirror from '@uiw/react-codemirror';
import { jsonLanguage } from '@codemirror/lang-json';
import { Button } from '../../../general/Button/Button.jsx';

const getResultValue = (call) => {
  const currentResult = call.results.currentResult;
  return call.results.records.find((el) => el.resultId === currentResult)?.result;
};

export const Result = ({ call }) => {
  const setOpenResult = useStoreAction((store) => store.calls.setOpenResult);
  const callMethod = useStoreEffect((store) => store.calls.callMethod);

  const result = getResultValue(call);
  const temporaryFormValues = useStoreState(
    (store) => store.calls.temporaryFormValues[call.callId],
  );

  const getFormattedJSON = (json) => JSON.stringify(json, null, 2);

  const closeResult = () => {
    setOpenResult({ callId: call.callId, isOpen: false });
  };

  const resend = () => {
    const callValue = temporaryFormValues ? temporaryFormValues : call;
    callMethod(callValue);
  };

  return (
    <div>
      <div className={cn.container}>
        <div className={cn.topNav}>
          <button className={cn.backBtn} onClick={closeResult}>
            <BackIcon style={cn.icon} />
          </button>
        </div>
        {call.results.isLoading ? (
          <p className={cn.loader}>Loading...</p>
        ) : (
          <>
            <h3 className={cn.title}>Result</h3>
            {!result?.error ? (
              <>
                <CodeMirror
                  readOnly={true}
                  value={getFormattedJSON(result)}
                  extensions={[jsonLanguage]}
                />
              </>
            ) : (
              <p className={cn.error}>{getFormattedJSON(result)}</p>
            )}
          </>
        )}
      </div>
      <div className={cn.footer}>
        <div className={cn.closeBtn}>
          <Button onClick={closeResult} text="Close" style="outlined" />
        </div>
        <div className={cn.resendBtn}>
          {!call.results.isLoading && <Button onClick={resend} text="Resend" style="secondary" />}
        </div>
      </div>
    </div>
  );
};
