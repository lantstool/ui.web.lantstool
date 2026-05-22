import { useStoreAction } from '@react-vault';
import { Button } from '@gc/Button/Button.jsx';
import { Raw } from './Raw/Raw.jsx';
import { Overview } from './Overview/Overview.jsx';
import { TabButton } from '@gc/tab/TabButton/TabButton.jsx';
import { TabContainer } from '@gc/tab/TabContainer/TabContainer.jsx';
import { useRef, useState } from 'react';
import { Label } from '@gc/Label/Label.jsx';
import { useResultViewState } from '../../../_general/hooks/useResultViewState.js';
import cn from './Result.module.scss';

const methodsWithOverview = new Set([
  'getAccount',
  'getAccountKey',
  'getAccountKeys',
  'getContractWasm',
]);

const getMode = (formValues) =>
  methodsWithOverview.has(formValues.method.value) ? 'overview' : 'raw';

export const Result = ({ callResult, call }) => {
  const setResult = useStoreAction((store) => store.nearProtocol.calls.setResult);
  const { result, isLoading, callId, error, formValues, viewState } = callResult;
  const mode = getMode(formValues);
  const [viewMode, setViewMode] = useState(mode);
  const resultRef = useRef(null);

  const { onCreateEditor } = useResultViewState({
    ref: resultRef,
    viewState,
    onSave: (snapshot) => setResult({ callId, viewState: snapshot }),
  });

  const closeResult = () => setResult({ callId, isOpen: false });
  const changeViewMode = (next) => setViewMode(next);

  return (
    <div ref={resultRef} className={cn.result}>
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
              iconStyles={result ? cn.checkIcon : cn.errorIcon}
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
            <Raw result={result} error={error} onCreateEditor={onCreateEditor} />
          )}
        </div>
      </div>
      <div className={cn.footer}>
        <Button color="tertiary" size="medium" onClick={closeResult} iconLeftStyles={cn.icon}>
          Back
        </Button>
      </div>
    </div>
  );
};
