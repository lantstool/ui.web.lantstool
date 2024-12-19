import { useStoreAction } from '@react-vault';
import { Button } from '../../../../../../_general/Button/Button.jsx';
import { ArrowBackOutline } from '../../../../../../_general/icons/ArrowBackOutline.jsx';
import { Raw } from './Raw/Raw.jsx';
import { Overview } from './Overview/Overview.jsx';
import { TabButton } from '../../../../../../_general/tab/TabButton/TabButton.jsx';
import { TabContainer } from '../../../../../../_general/tab/TabContainer/TabContainer.jsx';
import { useState } from 'react';
import { Label } from '../../../../../../_general/Label/Label.jsx';
import { ErrorCircleBold } from '../../../../../../_general/icons/ErrorCircleBold.jsx';
import { CheckCircleBold } from '../../../../../../_general/icons/CheckCircleBold.jsx';
import cn from './Result.module.scss';

const getMode = (formValues) => {
  const overviewMethods = ['getAccount', 'getAccountKey', 'getAccountKeys'];
  return overviewMethods.includes(formValues.method.value) ? 'overview' : 'raw';
};

export const Result = ({ callResult, call }) => {
  const setResult = useStoreAction((store) => store.nearProtocol.calls.setResult);
  const { result, isLoading, callId, error, formValues } = callResult;
  const mode = getMode(formValues);
  const [viewMode, setViewMode] = useState(mode);

  const closeResult = () => {
    setResult({ callId, isOpen: false });
  };

  const changeViewMode = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className={cn.result}>
      <div className={cn.container}>
        <div className={cn.head}>
          <div className={cn.headWrapper}>
            <h2 className={cn.title}>Result</h2>
            <p className={cn.call}>
              {call.name} ⋅ {formValues.method.label}
            </p>
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
        {mode === 'overview' && result && (
          <TabContainer>
            <TabButton
              onClick={() => changeViewMode('overview')}
              isActive={viewMode === 'overview'}
            >
              Overview
            </TabButton>
            <TabButton onClick={() => changeViewMode('raw')} isActive={viewMode === 'raw'}>
              Raw
            </TabButton>
          </TabContainer>
        )}
        <div className={cn.content}>
          {isLoading ? (
            <p className={cn.loader}>Loading...</p>
          ) : viewMode === 'overview' && result && !error ? (
            <Overview result={result} formValues={formValues} />
          ) : (
            <Raw result={result} error={error} />
          )}
        </div>
      </div>
      <div className={cn.footer}>
        <Button color="tertiary" size="medium" onClick={closeResult} IconLeft={ArrowBackOutline}>
          Back
        </Button>
      </div>
    </div>
  );
};
