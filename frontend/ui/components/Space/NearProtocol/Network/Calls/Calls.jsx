import { List } from './List/List.jsx';
import { useStoreState, useStoreEffect } from '@react-vault';
import { Outlet, useParams } from 'react-router-dom';
import { Empty } from './Empty/Empty.jsx';
import { useManageRouting } from './useManageRouting.js';
import { useLoader } from '@hooks/useLoader.js';
import cn from './Calls.module.scss';

export const Calls = () => {
  const list = useStoreState((store) => store.nearProtocol.calls.list);
  const getCallsList = useStoreEffect((store) => store.nearProtocol.calls.getList);
  const foldersList = useStoreState((store) => store.nearProtocol.folders.records);
  const getFoldersList = useStoreEffect((store) => store.nearProtocol.folders.getList);
  const { spaceId, networkId } = useParams();

  const [isLoadingCalls] = useLoader(getCallsList, { spaceId, networkId }, [spaceId, networkId]);

  const [isLoadingFolders] = useLoader(getFoldersList, { spaceId, networkId, type: 'call' }, [
    spaceId,
    networkId,
  ]);

  useManageRouting();

  if (isLoadingCalls || isLoadingFolders) return null;
  if (list.length === 0 && foldersList.length === 0) return <Empty />;

  return (
    <div className={cn.calls}>
      <List list={list} foldersList={foldersList} />
      {foldersList.length !== 0 && list.length === 0 && <Empty />}
      <Outlet />
    </div>
  );
};
