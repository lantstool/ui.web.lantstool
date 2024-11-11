import { useStoreAction } from '@react-vault';
import { BackIcon } from '../../../../../../_general/icons/BackIcon.jsx';
import CodeMirror from '@uiw/react-codemirror';
import { jsonLanguage } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';
import { Button } from '../../../_general/Button/Button.jsx';
import cn from './Result.module.scss';

// TODO Move to utils
const getFormattedJSON = (json) => JSON.stringify(json, null, 2);

export const Result = ({ callResult }) => {
  const { result, isLoading, callId } = callResult;
  const setResult = useStoreAction((store) => store.nearProtocol.calls.setResult);

  const closeResult = () => {
    setResult({ callId, isOpen: false });
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
            <CodeMirror
              readOnly={true}
              value={getFormattedJSON(result)}
              extensions={[jsonLanguage, EditorView.lineWrapping]}
            />
          </>
        )}
      </div>
      <div className={cn.footer}>
        <div className={cn.closeBtn}>
          <Button onClick={closeResult} text="Close" style="outlined" />
        </div>
      </div>
    </div>
  );
};
