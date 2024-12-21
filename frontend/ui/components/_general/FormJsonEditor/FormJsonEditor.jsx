import { Controller } from 'react-hook-form';
import { JsonEditor } from '../JsonEdiitor/JsonEditor.jsx';

export const FormJsonEditor = ({
  name,
  control,
  topbar,
  readOnly,
  showClearBtn,
  showCopyBtn,
  classes,
  customTheme,
  dynamicErrorSpace,
  errorLabel,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => (
      <JsonEditor
        formRef={ref}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        topbar={topbar}
        readOnly={readOnly}
        showClearBtn={showClearBtn}
        showCopyBtn={showCopyBtn}
        classes={classes}
        customTheme={customTheme}
        error={error}
        dynamicErrorSpace={dynamicErrorSpace}
        errorLabel={errorLabel}
      />
    )}
  />
);
