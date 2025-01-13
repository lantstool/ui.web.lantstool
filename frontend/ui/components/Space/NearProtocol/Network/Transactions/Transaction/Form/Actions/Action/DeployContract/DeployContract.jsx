import { useStoreEffect } from '@react-vault';
import { useController } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { FileUploader } from '../../../../../../../../../_general/fileUploader/FileUploader/FileUploader.jsx';
import { ActionBase } from '../_general/ActionBase/ActionBase.jsx';

export const DeployContract = ({ iconStyle, order, index, removeAction, form, getName }) => {
  const { transactionId } = useParams();
  const uploadContract = useStoreEffect((store) => store.nearProtocol.transactions.uploadContract);

  const {
    field: { value, onChange: fieldOnChange },
    fieldState: { error },
  } = useController({ name: getName('fileName'), control: form.control });

  const setFile = async (file) => {
    const setFieldValue = (fileName) => fieldOnChange(fileName);
    await uploadContract({ transactionId, actionIndex: index, file, setFieldValue });
  };

  return (
    <ActionBase
      iconStyle={iconStyle}
      label="Deploy Contract"
      order={order}
      removeAction={removeAction}
      color="blue"
      tooltipContent="Contract Code"
    >
      <FileUploader
        fileName={value}
        setFile={setFile}
        allowedFileTypes={{ 'application/wasm': ['.wasm'] }}
        callToActionText="Upload a .wasm or drag&drop it here"
        topbar={{ label: 'Contract WASM' }}
        error={error?.message}
        dynamicErrorSpace
      />
    </ActionBase>
  );
};

{
  /*<FormFileUploader*/
}
{
  /*  name={getName('file')}*/
}
{
  /*  control={form.control}*/
}
{
  /*  topbar={{ label: 'Contract WASM' }}*/
}
{
  /*  callToActionText="Upload a .wasm or drag&drop it here"*/
}
{
  /*  allowedFileTypes={{ 'application/wasm': ['.wasm'] }}*/
}
{
  /*  dynamicErrorSpace*/
}
{
  /*/>*/
}
