import { DeleteModal } from './DeleteModal/DeleteModal.jsx';
import cn from './DangerZone.module.scss';

export const DangerZone = ({ space }) => (
  <div className={cn.dangerZone}>
    <h2 className={cn.title}>Danger zone</h2>
    <div className={cn.container}>
      <div className={cn.warningWrapper}>
        <h2 className={cn.subtitle}>Delete this space</h2>
        <p className={cn.warningText}>
          Deleting a space is permanent and cannot be undone, be careful.
        </p>
      </div>
      <DeleteModal space={space} />
    </div>
  </div>
);
