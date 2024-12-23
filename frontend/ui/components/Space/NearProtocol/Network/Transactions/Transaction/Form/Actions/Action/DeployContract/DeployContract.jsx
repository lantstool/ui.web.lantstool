import { FormFileUploader } from '../../../../../../../../../_general/fileUploader/FormFileUploader.jsx';
import { ActionBase } from '../_general/ActionBase/ActionBase.jsx';

export const DeployContract = ({ iconStyle, name, order, removeAction, form, getName }) => {
  return (
    <ActionBase
      iconStyle={iconStyle}
      label={name}
      order={order}
      removeAction={removeAction}
      color="blue"
      tooltipContent="Contract code"
    >
      <FormFileUploader
        name={getName('file')}
        control={form.control}
        topbar={{ label: 'Contract WASM' }}
        callToActionText="Upload a .wasm or drag&drop it here"
        allowedFileTypes={{ 'application/wasm': ['.wasm'] }}
        dynamicErrorSpace
      />
    </ActionBase>
  );
};
