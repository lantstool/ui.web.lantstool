import { jsonLanguage } from '@codemirror/lang-json';
import { useStoreEffect } from '@react-vault';
import { EditorView } from '@uiw/react-codemirror';
import { baseEditorStyles } from '@styles/baseEditorStyles.js';
import CodeMirror from '@uiw/react-codemirror';
import { useParams } from 'react-router-dom';
import { FieldErrorLabel } from '../../../../../../../_general/FieldErrorLabel/FieldErrorLabel.jsx';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../../../../../../../_general/Button/Button.jsx';
import { yupResolver } from '@hookform/resolvers/yup';
import { callImportSchema } from '../_general/validations/callImportSchema.js';
import cn from './PasteJson.module.scss';

export const theme = (error) =>
  EditorView.theme({
    ...baseEditorStyles,
    '&': {
      color: '#212529',
      backgroundColor: '#ffffff',
      height: '100%',
      borderRadius: '8px',
      border: error ? '1px solid #CA2C2C' : '1px solid #E9ECEF',
    },
  });

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

export const PasteJson = () => {
  const { spaceId, networkId } = useParams();
  const importOneFromJson = useStoreEffect((store) => store.nearProtocol.calls.importOneFromJson);

  const { control, formState, handleSubmit } = useForm({
    defaultValues: { json: '' },
    mode: 'onTouched',
    resolver: yupResolver(callImportSchema),
    shouldFocusError: false,
  });

  const submit = handleSubmit((formValues) => {
    importOneFromJson({ spaceId, networkId, formValues });
  });

  return (
    <>
      <div className={cn.editorWrapper}>
        <Controller
          name="json"
          control={control}
          render={({ field }) => {
            const value = field.value ? field.value : '';
            return (
              <CodeMirror
                {...field}
                value={value}
                className={cn.editor}
                theme={theme(formState?.errors?.json)}
                extensions={[jsonLanguage, EditorView.lineWrapping]}
                basicSetup={{ tabSize: 2 }}
              />
            );
          }}
        />
      </div>
      <div className={cn.errorContainer}>
        {formState?.errors && <FieldErrorLabel error={collectErrorMessages(formState.errors)[0]} />}
      </div>
      <div className={cn.modalFooter}>
        <Button size="medium" onClick={submit}>
          Import
        </Button>
      </div>
    </>
  );
};
