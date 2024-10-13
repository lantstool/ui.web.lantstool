import { useParams } from 'react-router-dom';
import { useStoreEffect, useStoreState } from '../../../../../../../../react-vault/index.js';
import { useLoader } from '../../../../../../hooks/useLoader.js';
import { Empty } from '../Empty/Empty.jsx';
import { useState } from 'react';
import { ImportModals } from '../_general/ImportKey/ImportModals.jsx';
import { Table } from './Table/Table.jsx';
import { TopBar } from './TopBar/TopBar.jsx';
import { BottomBar } from './BottomBar/BottomBar.jsx';
import cn from './List.module.scss';

export const List = () => {
  const { spaceId, networkId } = useParams();
  const [isOpen, setOpen] = useState(false);
  const ids = useStoreState((store) => store.nearProtocol.keys.ids);
  const getKeyList = useStoreEffect((store) => store.nearProtocol.keys.getKeyList);

  const [isLoading] = useLoader(getKeyList, { spaceId, networkId });

  if (isLoading) return null;
  if (ids.length === 0) return <Empty />;

  const openModal = () => {
    setOpen(true);
  };

  return (
    <div className={cn.container}>
      <div className={cn.wrapper}>
        <TopBar />
        <ImportModals isOpen={isOpen} setOpen={setOpen} />
        <Table ids={ids} />
        <BottomBar openModal={openModal} />
      </div>
    </div>
  );
};
