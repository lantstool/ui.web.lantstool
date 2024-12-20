import { useDropzone } from 'react-dropzone';
import { Button } from '../Button/Button.jsx';
import { FileSmileBold } from '../icons/FileSmileBold.jsx';
import { FileOutline } from '../icons/FileOutline.jsx';
import cn from './FileUploader.module.scss';

export const FileUploader = ({
  setValue = () => ({}),
  name = null,
  file,
  setFile,
  callToActionText,
  allowedFileTypes,
}) => {
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      name && setValue(name, acceptedFiles);
    },
    multiple: false,
    accept: allowedFileTypes,
  });

  return (
    <div {...getRootProps({ className: cn.dropzone })}>
      <input {...getInputProps()} />
      {file ? (
        <>
          <FileOutline style={cn.fileOutlineIcon} />
          <p className={cn.fileName}>{file.name}</p>
        </>
      ) : (
        <>
          <FileSmileBold style={cn.fileSmileBoldIcon} />
          <p className={cn.callToAction}>{callToActionText}</p>
        </>
      )}
      <Button size="medium" color="secondary" onClick={open}>
        Browse
      </Button>
    </div>
  );
};
