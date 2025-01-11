import { yupResolver } from '@hookform/resolvers/yup';
import { useStoreEffect } from '@react-vault';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../../../../_general/Button/Button.jsx';
import { FormFileUploader } from '../../../../../../_general/fileUploader/FormFileUploader.jsx';
import { schema } from './schema.js';
import cn from './UploadZip.module.scss';

export const UploadZip = ({ closeModal, yupSchema, importOneFromZip }) => {
  const navigate = useNavigate();
  const { spaceId, networkId } = useParams();

  const { control, handleSubmit, setError } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    shouldFocusError: false,
  });

  const submit = handleSubmit((formValues) => {
    importOneFromZip({
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
        topbar={{ label: 'Exported .zip' }}
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
