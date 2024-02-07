import { Topbar } from './Topbar/Topbar.tsx';
import cn from './Call.module.css';
import { useParams, Outlet } from 'react-router-dom';
import { useStoreState } from '../../../../../react-vault';
import { useNavigateToSavedRoute } from "../../../../../store/slices/navigation/useNavigateToSavedRoute.ts";

export const Call = () => {
  const { callId } = useParams();
  const call = useStoreState((store: any) => store.calls.map[callId]);

  useNavigateToSavedRoute('/:currentNetworkId/calls/:callId');

  return (
    <div className={cn.call}>
      <Topbar call={call} />
      <Outlet />
    </div>
  );
};
