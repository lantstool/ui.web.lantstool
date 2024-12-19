import { Button } from '../../../../../../_general/Button/Button.jsx';
import { useStoreAction } from '@react-vault';
import { ArrowBackOutline } from '../../../../../../_general/icons/ArrowBackOutline.jsx';
import { Label } from '../../../../../../_general/Label/Label.jsx';
import { CheckCircleBold } from '../../../../../../_general/icons/CheckCircleBold.jsx';
import { ErrorCircleBold } from '../../../../../../_general/icons/ErrorCircleBold.jsx';
import { JsonEditor } from '../../../../../../_general/JsonEdiitor/JsonEditor.jsx';
import { Tooltip } from '../../../../../../_general/Tooltip/Tooltip.jsx';
import { CopyButton } from '../../../../../../_general/CopyButton/CopyButton.jsx';
import {getFormattedJSON} from '../../../../../../../../store/helpers/utils.js';
import cn from './Result.module.scss';

export const Result = ({ txResult, transaction }) => {
  const { result, isLoading, transactionId, error } = txResult;
  const setResult = useStoreAction((store) => store.nearProtocol.transactions.setResult);
  const data = result? result: error

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
              Icon={result ? CheckCircleBold : ErrorCircleBold}
              color={result ? 'success' : 'error'}
            >
              {result ? 'Success' : 'Failed'}
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
                  <CopyButton type='small' value={result.transactionOutcome?.id} />
                </div>
                <div className={cn.hash}>{result.transactionOutcome?.id}</div>
              </>
            )}
            <JsonEditor readOnly value={getFormattedJSON(data)} copyValue={getFormattedJSON(data)} />
          </>
        )}
      </div>
      <div className={cn.footer}>
        <Button color="tertiary" size="medium" onClick={closeResult} IconLeft={ArrowBackOutline}>
          Back
        </Button>
      </div>
    </div>
  );
};
