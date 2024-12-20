import { useStoreEffect } from '@react-vault';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../../../_general/Button/Button.jsx';
import { ImportOutline } from '../../../../../_general/icons/ImportOutline.jsx';
import callsBold from '@assets/callsBold.svg';
import cn from './Empty.module.scss';

export const Empty = () => {
  const createOne = useStoreEffect((store) => store.nearProtocol.calls.createOne);
  const navigate = useNavigate();
  const { spaceId, networkId } = useParams();

  const create = () => createOne({ spaceId, networkId, navigate });

  return (
    <div className={cn.empty}>
      <img src={callsBold} alt="#" />
      <h2 className={cn.title}>
        Looks like you need to add something here.
        <br /> Get a move on.
      </h2>

      <div className={cn.btnWrapper}>
        <Button color="secondary" type="button" IconLeft={ImportOutline}>
          Import
        </Button>
        <Button onClick={create} type="button">
          Create call
        </Button>
      </div>
    </div>
  );
};
