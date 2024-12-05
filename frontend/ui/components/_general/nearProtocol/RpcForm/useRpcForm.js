import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { schema } from './schema.js';

export const useRpcForm = (defaultValues) =>
  useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: defaultValues || {
      rpcName: '',
      url: '',
      withHeader: false,
      header: null,
    },
  });
