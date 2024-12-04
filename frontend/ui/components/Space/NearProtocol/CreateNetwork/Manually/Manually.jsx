import { useForm, useWatch } from 'react-hook-form';
import { Input } from '../../../../_general/Input/Input.jsx';
import { Checkbox } from '../../../../_general/Checkbox/Checkbox.jsx';
import { Tooltip } from '../../../../_general/Tooltip/Tooltip.jsx';
import { InfoCircleLinear } from '../../../../_general/icons/InfoCircleLinear.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { Button } from '../../../../_general/Button/Button.jsx';
import { schema } from './schema.js';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from './Manually.module.scss';

export const Manually = () => {
  const { spaceId } = useParams();
  const createManually = useStoreEffect((store) => store.nearProtocol.networks.createManually);
  const navigate = useNavigate();

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      rpcName: 'Local',
      url: 'http://localhost:3030',
      withHeader: false,
      header: null,
    },
  });

  const {
    control,
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = form;

  const header = useWatch({ control, name: 'header' });

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setValue('header', { name: '', value: '' });
    } else {
      setValue('header', null);
    }
  };

  const onSubmit = handleSubmit((formValues) => {
    createManually({ formValues, spaceId, navigate });
  });

  return (
    <form onSubmit={onSubmit} className={cn.manually}>
      <div className={cn.wrapper}>
        <Input
          control={control}
          name="rpcName"
          label="RPC Name"
          placeholder="My RPC"
          error={errors?.rpcName?.message}
          copy={false}
        />
        <Input
          control={control}
          name="url"
          label="RPC URL"
          placeholder="https://rpc.network.com"
          error={errors?.url?.message}
          tooltip={
            <Tooltip
              content="The RPC API allows you to communicate directly with the NEAR network."
              placement="top"
            >
              <InfoCircleLinear />
            </Tooltip>
          }
          copy={false}
        />
        <div className={cn.checkboxContainer}>
          <Checkbox register={register} name="withHeader" onChange={handleCheckboxChange} />
          <p className={cn.label}>Add header parameters </p>
        </div>
        {header && (
          <div className={cn.container}>
            <Input
              control={control}
              name="header.name"
              label="Header name"
              placeholder="Authorization"
              error={errors?.header?.name?.message}
              copy={false}
              tooltip={
                <Tooltip content="Header name" placement="top">
                  <InfoCircleLinear />
                </Tooltip>
              }
            />
            <Input
              control={control}
              name="header.value"
              label="Header value"
              placeholder="e.g. API key or ID"
              error={errors?.header?.value?.message}
              copy={false}
              tooltip={
                <Tooltip content="Header value" placement="top">
                  <InfoCircleLinear />
                </Tooltip>
              }
            />
          </div>
        )}
      </div>
      <div className={cn.buttonWrapper}>
        <Button type="submit">Create Network</Button>
      </div>
    </form>
  );
};
