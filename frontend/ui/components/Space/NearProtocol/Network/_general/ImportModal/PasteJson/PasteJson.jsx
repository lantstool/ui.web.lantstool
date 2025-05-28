import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '../../../../../../_general/Button/Button.jsx';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldErrorLabel } from '../../../../../../_general/FieldErrorLabel/FieldErrorLabel.jsx';
import { FormJsonEditor } from '../../../../../../_general/jsonEditor/FormJsonEditor.jsx';
import { collectFormErrorMessages } from '../../../../../../../../store/helpers/collectFormErrorMessages.js';
import cn from './PasteJson.module.scss';

export const PasteJson = ({ closeModal, yupSchema, importOneFromJson }) => {
  const navigate = useNavigate();
  const { spaceId, networkId } = useParams();

  const { control, formState, handleSubmit } = useForm({
    defaultValues: { json: '' },
    mode: 'onTouched',
    resolver: yupResolver(yupSchema),
    shouldFocusError: false,
  });

  const submit = handleSubmit((formValues) => {
    importOneFromJson({ spaceId, networkId, formValues, navigate, closeModal });
  });

  return (
    <>
      <FormJsonEditor
        topbar={{ label: 'Exported JSON' }}
        name="json"
        control={control}
        classes={{ container: cn.editor }}
        errorLabel={
          formState?.errors && (
            <FieldErrorLabel error={collectFormErrorMessages(formState.errors)[0]} />
          )
        }
        withLineWrapping
      />
      <div className={cn.modalFooter}>
        <Button size="medium" onClick={submit}>
          Import
        </Button>
      </div>
    </>
  );
};
