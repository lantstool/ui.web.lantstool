import { DeleteKeyModal } from './DeleteKeyModal/DeleteKeyModal.jsx';
import cn from './DangerZone.module.scss';

export const DangerZone = () => (
  <div className={cn.dangerZone}>
    <h2 className={cn.title}>Danger zone</h2>
    <div className={cn.container}>
      <div className={cn.warningWrapper}>
        <h2 className={cn.subtitle}>Remove this key</h2>
        <p className={cn.warningText}>
          Make sure to save this key in another secure location before removal,
          to avoid losing access to your account(s).
        </p>
      </div>
      <DeleteKeyModal />
    </div>
  </div>
);
