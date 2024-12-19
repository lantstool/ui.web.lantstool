import cn from './Result.module.scss';
import { Button } from '../../../../../../_general/Button/Button.jsx';
import { jsonLanguage } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';
import { useStoreAction } from '@react-vault';
import { BackIcon } from '../../../../../../_general/icons/BackIcon.jsx';

// TODO Move to utils
const getFormattedJSON = (json) => JSON.stringify(json, null, 2);

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

export const Result = ({ txResult }) => {
  const { result, isLoading, transactionId } = txResult;
  const setResult = useStoreAction((store) => store.nearProtocol.transactions.setResult);

  const closeResult = () => {
    setResult({ transactionId, isOpen: false });
  };

  return (
    <div>
      <div className={cn.container}>
        <div className={cn.topNav}>
          <button className={cn.backBtn} onClick={closeResult}>
            <BackIcon style={cn.icon} />
          </button>
        </div>
        {isLoading ? (
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
                <p className={cn.subtitle}>{result.transactionOutcome?.id}</p>
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
          <Button onClick={closeResult}>Close</Button>
        </div>
      </div>
    </div>
  );
};
