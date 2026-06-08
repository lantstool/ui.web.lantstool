import { useStoreAction } from '@react-vault';
import { Button } from '@gc/Button/Button.jsx';
import { Raw } from './Raw/Raw.jsx';
import { Overview } from './Overview/Overview.jsx';
import { TabButton } from '@gc/tab/TabButton/TabButton.jsx';
import { TabContainer } from '@gc/tab/TabContainer/TabContainer.jsx';
import { useRef } from 'react';
import { Label } from '@gc/Label/Label.jsx';
import { usePersistentEditorState } from '../../../_general/hooks/persistentEditorState/usePersistentEditorState.js';
import { getFormattedJSON } from '../../../../../../../../store/helpers/utils.js';
import cnm from 'classnames';
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
  const setEditorState = useStoreAction((store) => store.nearProtocol.calls.setEditorState);
  const setViewMode = useStoreAction((store) => store.nearProtocol.calls.setViewMode);
  const { result, isLoading, callId, error, formValues, editorState } = callResult;
  const mode = getMode(formValues);
  const viewMode = callResult.viewMode ?? mode;
  const resultRef = useRef(null);
  const originalJson = getFormattedJSON(result ? result : error);

  const { onCreateEditor, value, formatLineNumber, ready, freezeScroll, copyExtensions } =
    usePersistentEditorState({
      scrollerRef: resultRef,
      originalJson,
      editorState,
      onSave: (snapshot) => setEditorState({ callId, editorState: snapshot }),
    });

  const showEditor = !isLoading && !(viewMode === 'overview' && result && !error);
  //To avoid scroll jump we hide content while the Raw editor wraps + restores scroll
  const hideContent = showEditor && !ready;

  const closeResult = () => setResult({ callId, isOpen: false });
  const changeViewMode = (viewMode) => {
    freezeScroll(viewMode);
    setViewMode({ callId, viewMode });
  };

  return (
    <div ref={resultRef} className={cn.result}>
      <div
        className={cnm(cn.container, hideContent && cn.hideContainer)}
      >
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
            <Raw
              value={value}
              copyValue={originalJson}
              onCreateEditor={onCreateEditor}
              formatLineNumber={formatLineNumber}
              copyExtensions={copyExtensions}
            />
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
