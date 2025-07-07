import { Button } from '@gc/Button/Button.jsx';
import { useStoreAction } from '@react-vault';
import { Label } from '@gc/Label/Label.jsx';
import { JsonEditor } from '@gc/jsonEditor/JsonEditor/JsonEditor.jsx';
import { Tooltip } from '@gc/Tooltip/Tooltip.jsx';
import { CopyButton } from '@gc/CopyButton/CopyButton.jsx';
import { getFormattedJSON } from '../../../../../../../../store/helpers/utils.js';
import cn from './Result.module.scss';

export const Result = ({ txResult, transaction }) => {
  const { result, isLoading, transactionId, error } = txResult;
  const setResult = useStoreAction((store) => store.nearProtocol.transactions.setResult);
  const data = result ? result : error;
  const isSuccessResult = result?.status && 'successValue' in result.status;

  const closeResult = () => {
    setResult({ transactionId, isOpen: false });
  };

  return (
    <div className={cn.result}>
      <div className={cn.container}>
        <div className={cn.head}>
          <div className={cn.headWrapper}>
            <h2 className={cn.title}>Result</h2>
            <p className={cn.call}>{transaction.name}</p>
          </div>
          {!isLoading && (
            <Label
              iconStyles={isSuccessResult ? cn.checkCircleIcon : cn.errorCircleIcon}
              color={isSuccessResult ? 'success' : 'error'}
            >
              {isSuccessResult ? 'Success' : 'Failed'}
            </Label>
          )}
        </div>
        {isLoading ? (
          <p className={cn.loader}>Loading...</p>
        ) : (
          <>
            {result && (
              <>
                <div className={cn.hashWrapper}>
                  <div className={cn.tooltipWrapper}>
                    <Tooltip content="Transaction hash" placement="top" defaultContent />
                    <p className={cn.subtitle}>Txn Hash</p>
                  </div>
                  <CopyButton type="small" value={result.transactionOutcome?.id} />
                </div>
                <div className={cn.hash}>{result.transactionOutcome?.id}</div>
              </>
            )}
            <JsonEditor
              readOnly
              value={getFormattedJSON(data)}
              showClearBtn={false}
              withLineWrapping
              title="json"
            />
          </>
        )}
      </div>
      <div className={cn.footer}>
        <Button
          color="tertiary"
          size="medium"
          onClick={closeResult}
          iconLeftStyles={cn.arrowBackIcon}
        >
          Back
        </Button>
      </div>
    </div>
  );
};
