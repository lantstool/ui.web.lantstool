import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../../../../_general/Button/Button.jsx';
import { FormFileUploader } from '../../../../../../_general/fileUploader/FormFileUploader.jsx';
import { schema } from './schema.js';
import cn from './UploadFile.module.scss';

export const UploadFile = ({ closeModal, yupSchema, importOneFromFile }) => {
  const navigate = useNavigate();
  const { spaceId, networkId } = useParams();

  const { control, handleSubmit, setError } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    shouldFocusError: false,
  });

  const submit = handleSubmit((formValues) => {
    importOneFromFile({
      spaceId,
      networkId,
      formValues,
      navigate,
      closeModal,
      setError,
      yupSchema,
    });
  });

  return (
    <>
      <FormFileUploader
        name="file"
        control={control}
        topbar={{ label: 'Exported file' }}
        allowedFileTypes={{
          'application/zip': ['.zip'],
          'application/json': ['.json'],
        }}
        classes={{ container: cn.fileUploader }}
        callToActionText="Select a .json or .zip file, or drag & drop it here"
      />
      <div className={cn.modalFooter}>
        <Button size="medium" onClick={submit}>
          Import
        </Button>
      </div>
    </>
  );
};
