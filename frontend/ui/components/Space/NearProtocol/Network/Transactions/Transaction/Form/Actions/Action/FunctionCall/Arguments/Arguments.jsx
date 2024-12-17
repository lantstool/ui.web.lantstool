import { FormJsonEditor } from '../../../../../../../../../../_general/FormJsonEditor/FormJsonEditor.jsx';

export const Arguments = ({ form, name }) => {
  const { control, watch } = form;

  const args = watch(name);
  const clear = () => form.setValue(name, '');

  return (
    <FormJsonEditor
      label="Arguments"
      control={control}
      copyValue={args}
      name={name}
      clear={clear}
    />
  );
};
