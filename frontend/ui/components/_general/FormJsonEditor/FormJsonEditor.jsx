import { Controller } from 'react-hook-form';
import { JsonEditor } from '../JsonEdiitor/JsonEditor.jsx';

export const FormJsonEditor = ({ control, label, copyValue, clear, name, value, readOnly }) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <JsonEditor
        error={error}
        clear={clear}
        copyValue={copyValue}
        label={label}
        field={field}
        value={value}
        readOnly={readOnly}
      />
    )}
  />
);
