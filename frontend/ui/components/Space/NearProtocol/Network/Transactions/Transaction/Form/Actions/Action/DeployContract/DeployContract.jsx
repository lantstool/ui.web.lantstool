import { useState } from 'react';
import { FileUploader } from '../../../../../../../../../_general/FileUploader/FileUploader.jsx';
import { ActionBase } from '../_general/ActionBase/ActionBase.jsx';
import { FieldErrorLabel } from '../../../../../../../../../_general/FieldErrorLabel/FieldErrorLabel.jsx';
import cn from './DeployContract.module.scss';

export const DeployContract = ({ iconStyle, name, order, removeAction, form, getName }) => {
  const [file, setFile] = useState(null);
  const {
    formState: { errors },
    setValue,
  } = form;

  return (
    <ActionBase
      iconStyle={iconStyle}
      label={name}
      order={order}
      removeAction={removeAction}
      color="blue"
      tooltipContent="Contract code"
    >
      <h2 className={cn.title}>Contract code</h2>
      <div className={cn.container}>
        <FileUploader
          setValue={setValue}
          name={getName('file')}
          file={file}
          setFile={setFile}
          callToActionText="Upload a file or drag and drop it here"
          allowedFileTypes={{ 'application/wasm': ['.wasm'] }}
        />
      </div>
      <FieldErrorLabel dynamicErrorSpace error={errors[getName('file')?.message]} />
    </ActionBase>
  );
};
