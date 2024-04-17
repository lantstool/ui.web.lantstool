import cn from './Result.module.css';
import { useStoreAction } from '../../../../../../react-vault';
import { BackIcon } from '../../../../../assets/components/BackIcon.tsx';
import CodeMirror from '@uiw/react-codemirror';
import { jsonLanguage } from '@codemirror/lang-json';
import { Button } from '../../../general/Button/Button.tsx';

const getResultValue = (call: any) => {
  const currentResult = call.results.currentResult;
  return call.results.records.find((el: any) => el.resultId === currentResult)?.result;
};

export const Result = ({ call }: any) => {
  const setOpenResult: any = useStoreAction((store: any) => store.calls.setOpenResult);
  const result = getResultValue(call);

  const getFormattedJSON = (json: string) => JSON.stringify(json, null, 2);

  const closeResult = () => {
    setOpenResult({ callId: call.callId, isOpen: false });
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
                <CodeMirror readOnly={true} value={getFormattedJSON(result)} extensions={[jsonLanguage]} />
              </>
            ) : (
              <p className={cn.error}>{getFormattedJSON(result)}</p>
            )}
          </>
        )}
      </div>
      <div className={cn.footer}>
        <Button onClick={closeResult} text={'Close'} style="outlined" />
      </div>
    </div>
  );
};
