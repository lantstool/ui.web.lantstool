import { Button } from '@gc/Button/Button.jsx';
import { useStoreAction } from '@react-vault';
import { Logger } from './Logger/Logger.jsx';
import cn from './OperationProgress.module.scss';

export const OperationProgress = ({ operationProgress, spaceId, networkId }) => {
  const backToForm = useStoreAction((store) => store.nearProtocol.utils.accountCleaner.backToForm);
  const { status, logs } = operationProgress;

  const backToFormOnClick = () => backToForm({ spaceId, networkId });

  return (
    <div className={cn.operationProgress}>
      <h1 className={cn.header}>Operation Progress</h1>
      <p className={cn.description}>
        The entire operation may take a few minutes — please do not close or reload the tab or
        browser. You can continue using the app as usual during this time.
      </p>
      <Logger logs={logs} />
      <Button
        color="secondary"
        size="medium"
        classes={{ button: cn.backButton }}
        disabled={status === 'inProgress'}
        onClick={backToFormOnClick}
      >
        Back
      </Button>
    </div>
  );
};
