import { useStoreEffect } from '@react-vault';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '../../../../../../../_general/Button/Button.jsx';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldErrorLabel } from '../../../../../../../_general/FieldErrorLabel/FieldErrorLabel.jsx';
import { FormJsonEditor } from '../../../../../../../_general/FormJsonEditor/FormJsonEditor.jsx';
import { callImportSchema } from '../_general/validations/callImportSchema.js';
import cn from './PasteJson.module.scss';

// We want to return the flat error array instead of having a tree -
// we display only the first error even if multiple errors are present
const collectErrorMessages = (errors) => {
  const messages = [];

  const extractMessages = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        extractMessages(obj[key]);
      } else if (key === 'message') {
        messages.push(obj[key]);
      }
    }
  };

  extractMessages(errors);
  return messages;
};

export const PasteJson = ({ closeModal }) => {
  const navigate = useNavigate();
  const { spaceId, networkId } = useParams();
  const importOneFromJson = useStoreEffect((store) => store.nearProtocol.calls.importOneFromJson);

  const { control, formState, handleSubmit } = useForm({
    defaultValues: { json: '' },
    mode: 'onTouched',
    resolver: yupResolver(callImportSchema),
    shouldFocusError: false,
  });

  const submit = handleSubmit((formValues) => {
    importOneFromJson({ spaceId, networkId, formValues, navigate, closeModal });
  });

  return (
    <>
      <FormJsonEditor
        topbar={{ label: 'Call Code' }}
        name="json"
        control={control}
        classes={{ container: cn.editor }}
        errorLabel={
          formState?.errors && <FieldErrorLabel error={collectErrorMessages(formState.errors)[0]} />
        }
      />
      <div className={cn.modalFooter}>
        <Button size="medium" onClick={submit}>
          Import
        </Button>
      </div>
    </>
  );
};
