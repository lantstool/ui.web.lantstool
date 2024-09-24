import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useStoreEffect } from '../../../../react-vault/index.js';
import cn from './CreateSpace.module.scss';

export const CreateSpace = () => {
  const navigate = useNavigate();
  const create = useStoreEffect((store) => store.spaces.create);
  const { register, handleSubmit } = useForm();

  const onSubmit = (formValues) => {
    create({ formValues, navigate });
  };

  return (
    <div className={cn.container}>
      <h1>Create Space</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={cn.form}>
        <input {...register('name')} placeholder="Space Name" />
        <span>Type: local</span>
        <button type="submit">Create Space</button>
      </form>
      <Link to="/spaces">Back to Spaces</Link>
    </div>
  );
};
