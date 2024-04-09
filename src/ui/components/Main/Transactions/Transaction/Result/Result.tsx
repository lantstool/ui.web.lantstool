import cn from './Result.module.css';
import { Button } from '../../../general/Button/Button.tsx';
import { jsonLanguage } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';
import { useStoreAction } from '../../../../../../react-vault';
import { BackIcon } from '../../../../../assets/components/BackIcon.tsx';

// TODO Move to utils
const getFormattedJSON = (json: string) => JSON.stringify(json, null, 2);

const getResultValue = (transaction: any) => {
  const currentResult = transaction.results.currentResult;
  return transaction.results.records.find((el: any) => el.resultId === currentResult)?.result;
};

export const Result = ({ transaction }: any) => {
  const setOpenResult: any = useStoreAction((store: any) => store.transactions.setOpenResult);
  const result = getResultValue(transaction);

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
        <Button onClick={closeResult} text={'Close'} style="outlined" />
      </div>
    </div>
  );
};
