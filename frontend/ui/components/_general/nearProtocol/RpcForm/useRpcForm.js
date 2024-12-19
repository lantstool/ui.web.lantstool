import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { schema } from './schema.js';

// TODO Replace header with headers
export const useRpcForm = (defaultValues) =>
  useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      name: defaultValues?.name || '',
      url: defaultValues?.url || '',
      withHeader: defaultValues?.withHeader || false,
      header: defaultValues?.withHeader ? defaultValues?.headers[0] : null,
    },
  });
