import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect } from '../../../../../../react-vault/index.js';
import cn from './CreateNetwork.module.scss';

export const CreateNetwork = () => {
  const { spaceId } = useParams();
  const createNetwork = useStoreEffect((store) => store.nearProtocol.networks.create);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = (formValues) => {
    createNetwork({ formValues, spaceId, navigate, setError });
  };

  return (
    <div className={cn.container}>
      <h1>Create Network</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={cn.form}>
        <input
          {...register('rpc')}
          placeholder="RPC URL"
          defaultValue="https://rpc.testnet.near.org"
        />
        <button type="submit">Create Network</button>
        {errors.rpc && <span>{errors.rpc.message}</span>}
      </form>
      <Link to=".." relative="path">
        Back to Networks
      </Link>
    </div>
  );
};
