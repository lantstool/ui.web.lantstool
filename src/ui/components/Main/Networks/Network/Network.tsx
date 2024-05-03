import { InputGroup } from '../../../general/InputGroup/InputGroup.jsx';
import { useForm } from 'react-hook-form';
import cn from './Network.module.css';
import { useStoreEffect } from '../../../../../react-vault';

export const Network = ({ network }) => {
  const editNetwork: any = useStoreEffect((store: any) => store.networks.editNetwork);
  const deleteNetwork: any = useStoreEffect((store: any) => store.networks.deleteNetwork);
  const { register, handleSubmit } = useForm({
    defaultValues: network,
  });

  const onSubmit = (data: any) => {
    console.log(data);
    editNetwork(data);
  };

  const remove = () => {
    confirm(
      'Are you sure you want to delete this network? It will delete all ' +
        'data associated with this network (transactions, accounts etc)',
    ) && deleteNetwork(network.networkId);
  };

  return (
    <div className={cn.network}>
      <p>Id: {network.networkId}</p>
      <button type="button" onClick={remove}>
        Delete
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup register={register} name={'name'} label="Name" />

        <fieldset style={{ borderRadius: 8 }}>
          <legend>Urls</legend>
          <InputGroup register={register} name={'url.rpc'} label="RPC" />
          <InputGroup register={register} name={'url.myNearWallet'} label="MyNearWallet" />
        </fieldset>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
