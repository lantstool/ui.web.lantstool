import { useEffect } from 'react';

export const useFieldsDefaultValues = (form, defaultValues) => {
  const { params } = form.getValues();
  console.log(form.getValues());
  useEffect(() => {
    if (params === null) form.setValue('params', defaultValues);
  }, []);
};
