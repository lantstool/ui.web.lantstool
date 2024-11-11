import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';

export const useIsFormHasChanges = (form, call) => {
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const subscription = form.watch(async (value) => {
      setHasChanges(!isEqual(value, call.body));
    });

    setHasChanges(!isEqual(form.getValues(), call.body));
    return () => subscription.unsubscribe();
  }, [form.watch, call]);

  return hasChanges;
};
