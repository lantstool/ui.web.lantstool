import { DeleteKeyModal } from './DeleteKeyModal/DeleteKeyModal.jsx';
import cn from './DangerZone.module.scss';

export const DangerZone = () => (
  <div className={cn.dangerZone}>
    <h2 className={cn.title}>Danger zone</h2>
    <div className={cn.container}>
      <div className={cn.warningWrapper}>
        <h2 className={cn.subtitle}>Delete this key</h2>
        <p className={cn.warningText}>
          Save this key elsewhere before removal to avoid losing account access.
        </p>
      </div>
      <DeleteKeyModal />
    </div>
  </div>
);
