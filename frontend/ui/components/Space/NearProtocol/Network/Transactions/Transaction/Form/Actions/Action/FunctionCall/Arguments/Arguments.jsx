import { CodeEditor } from '../../../../../../../../../../_general/CodeEditor/CodeEditor.jsx';

export const Arguments = ({ form, name }) => {
  const {
    control,
    formState: { errors },
    watch,
  } = form;

  const args = watch(name);
  const clear = () => form.setValue(name, '');

  return (
    <CodeEditor
      control={control}
      copyValue={args}
      name={name}
      clear={clear}
      error={errors[name]?.message}
    />
  );
};
