import { useDropzone } from 'react-dropzone';
import { Button } from '../../Button/Button.jsx';
import { FieldErrorLabel } from '../../FieldErrorLabel/FieldErrorLabel.jsx';
import { FieldTopbarLabel } from '../../FieldTopbarLabel/FieldTopbarLabel.jsx';
import cnm from 'classnames';
import cn from './FileUploader.module.scss';

export const FileUploader = ({
  file,
  setFile,
  callToActionText = 'Select a .zip file or drag&drop it here',
  allowedFileTypes,
  classes,
  topbar,
  error,
  dynamicErrorSpace,
}) => {
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
    multiple: false,
    accept: allowedFileTypes,
  });

  return (
    <div className={cnm(cn.container, classes?.container)}>
      {topbar && <FieldTopbarLabel label={topbar?.label} tooltip={topbar?.tooltip} />}
      <div {...getRootProps({ className: cn.dropzone })}>
        <input {...getInputProps()} />
        {file ? (
          <>
            <span className={cn.fileOutlineIcon} />
            <p className={cn.fileName}>{file.name}</p>
          </>
        ) : (
          <>
            <span className={cn.fileSmileBoldIcon} />
            <p className={cn.callToAction}>{callToActionText}</p>
          </>
        )}
        <Button size="medium" color="secondary" onClick={open}>
          Browse
        </Button>
      </div>
      <FieldErrorLabel error={error} dynamicErrorSpace={dynamicErrorSpace} />
    </div>
  );
};
