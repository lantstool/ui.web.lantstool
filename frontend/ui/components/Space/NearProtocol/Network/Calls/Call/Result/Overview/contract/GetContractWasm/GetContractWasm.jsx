import { JsonEditor } from '@gc/jsonEditor/JsonEditor/JsonEditor.jsx';
import { ReadOnlyInput } from '@gc/input/ReadOnlyInput/ReadOnlyInput.jsx';
import { Button } from '@gc/Button/Button.jsx';
import { useStoreEffect } from '@react-vault';
import cn from './GetContractWasm.module.scss';

export const GetContractWasm = ({ result, formValues }) => {
  const downloadWasm = useStoreEffect((store) => store.nearProtocol.calls.downloadWasm);

  const download = () => {
    downloadWasm({
      base64Wasm: result.codeBase64,
      contractId: formValues.contractId.value,
    });
  };

  return (
    <div className={cn.getAccountKeys}>
      <div className={cn.firstRow}>
        <ReadOnlyInput value={result.hash} label="WASM Hash" />
        <div>
          <Button onClick={download}>Download .wasm</Button>
        </div>
      </div>
      <JsonEditor
        readOnly
        value={result.codeBase64}
        topbar={{ label: 'Base64 WASM' }}
        showClearBtn={false}
        title="Base64"
      />
    </div>
  );
};
