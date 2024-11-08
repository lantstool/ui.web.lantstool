import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import logoLantstool from '@assets/logoLantstool.svg';
import { Button } from '../_general/Button/Button.jsx';
import { ArrowLeftOutline } from '../_general/icons/ArrowLeftOutline.jsx';
import { Input } from '../_general/Input/Input.jsx';
import { BadgeSelector } from '../_general/BadgeSelector/BadgeSelector.jsx';
import { getRandomBadge } from '../../../store/helpers/getRandomBadge.js';
import cn from './CreateSpace.module.scss';

export const CreateSpace = () => {
  const navigate = useNavigate();
  const create = useStoreEffect((store) => store.spaces.create);
  const randomBadge = getRandomBadge();
  const form = useForm({ defaultValues: { name: '', badge: randomBadge } });

  const { control, handleSubmit } = form;

  const onSubmit = (formValues) => {
    create({ formValues, navigate });
  };

  return (
    <div className={cn.createSpace}>
      <div className={cn.head}>
        <Link className={cn.backBtn} to="..">
          <Button size="small" IconLeft={ArrowLeftOutline}>
            Back
          </Button>
        </Link>
        <img src={logoLantstool} alt="#" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={cn.form}>
        <div className={cn.container}>
          <h1 className={cn.liteTitle}>Welcome</h1>
          <h1 className={cn.title}>
            Let’s create your space.
            <br /> Name it whatever you prefer
          </h1>
          <div className={cn.wrapper}>
            <Input control={control} name="name" placeholder="My workspace" copy={false} />
            <BadgeSelector form={form} />
          </div>
        </div>
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
};
