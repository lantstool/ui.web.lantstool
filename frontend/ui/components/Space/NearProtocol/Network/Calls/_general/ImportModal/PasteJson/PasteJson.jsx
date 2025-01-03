import { useStoreEffect } from '@react-vault';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '../../../../../../../_general/Button/Button.jsx';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldErrorLabel } from '../../../../../../../_general/FieldErrorLabel/FieldErrorLabel.jsx';
import { FormJsonEditor } from '../../../../../../../_general/jsonEditor/FormJsonEditor.jsx';
import { callImportSchema } from '../_general/validations/callImportSchema.js';
import { collectFormErrorMessages } from '../../../../../../../../../store/helpers/collectFormErrorMessages.js';
import cn from './PasteJson.module.scss';

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
          formState?.errors && (
            <FieldErrorLabel error={collectFormErrorMessages(formState.errors)[0]} />
          )
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
