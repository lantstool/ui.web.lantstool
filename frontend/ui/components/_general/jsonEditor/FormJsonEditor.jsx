import { Controller } from 'react-hook-form';
import { JsonEditor } from './JsonEditor/JsonEditor.jsx';

const defaultErrorExtractor = (error) => error?.message;

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
  errorExtractor = defaultErrorExtractor,
  withLineWrapping,
  title,
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
        error={errorExtractor(error)}
        dynamicErrorSpace={dynamicErrorSpace}
        errorLabel={errorLabel}
        withLineWrapping={withLineWrapping}
        title={title}
      />
    )}
  />
);
