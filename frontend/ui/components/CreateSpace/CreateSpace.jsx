import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import logoLantstool from '@assets/logoLantstool.svg';
import { Button } from '../_general/Button/Button.jsx';
import { ArrowLeftOutline } from '../_general/icons/ArrowLeftOutline.jsx';
import { Input } from '../_general/Input/Input.jsx';
import { BadgeSelector } from '../_general/BadgeSelector/BadgeSelector.jsx';
import { getRandomBadge } from '../../../store/helpers/getRandomBadge.js';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema.js';
import cn from './CreateSpace.module.scss';

export const CreateSpace = () => {
  const navigate = useNavigate();
  const create = useStoreEffect((store) => store.spaces.create);
  const randomBadge = getRandomBadge();

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { name: '', badge: randomBadge },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (formValues) => {
    create({ formValues, navigate });
  };

  return (
    <div className={cn.createSpace}>
      <div className={cn.head}>
        <div className={cn.backBtn}>
          <Button size="small" IconLeft={ArrowLeftOutline} onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
        <img src={logoLantstool} alt="Lantstool Logo - 3 circles with the app name" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={cn.form}>
        <div className={cn.container}>
          <h1 className={cn.title}>Let’s create your space</h1>
          <h1 className={cn.liteTitle}>Name it whatever you prefer</h1>
          <div className={cn.wrapper}>
            <Input
              control={control}
              name="name"
              placeholder="My workspace"
              copy={false}
              error={errors?.name?.message}
            />
            <BadgeSelector form={form} />
          </div>
        </div>
        <Button type="submit">Create Space</Button>
      </form>
    </div>
  );
};
