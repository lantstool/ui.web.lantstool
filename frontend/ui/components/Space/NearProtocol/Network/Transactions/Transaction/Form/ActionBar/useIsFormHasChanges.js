import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';

export const useIsFormHasChanges = (form, transaction) => {
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const subscription = form.watch(async (value) => {
      setHasChanges(!isEqual(value, transaction.body));
    });

    setHasChanges(!isEqual(form.getValues(), transaction.body));
    return () => subscription.unsubscribe();
  }, [form.watch, transaction]);

  return hasChanges;
};
