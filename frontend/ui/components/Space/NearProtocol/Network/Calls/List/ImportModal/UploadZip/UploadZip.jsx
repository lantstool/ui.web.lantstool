import { useForm } from 'react-hook-form';
import { Button } from '../../../../../../../_general/Button/Button.jsx';
import { FormFileUploader } from '../../../../../../../_general/fileUploader/FormFileUploader.jsx';
import cn from './UploadZip.module.scss';

export const UploadZip = () => {
  const { control, handleSubmit, setError } = useForm();

  const submit = handleSubmit((formValues) => {
    console.log(formValues);
  });

  return (
    <>
      <FormFileUploader
        name="file"
        control={control}
        topbar={{ label: 'Call Code' }}
        allowedFileTypes={{ 'application/zip': ['.zip'] }}
        classes={{ container: cn.fileUploader }}
      />
      <div className={cn.modalFooter}>
        <Button size="medium" onClick={submit}>
          Import
        </Button>
      </div>
    </>
  );
};
