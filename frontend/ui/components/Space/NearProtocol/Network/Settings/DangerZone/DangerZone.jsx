import { DeleteModal } from './DeleteModal/DeleteModal.jsx';
import cn from './DangerZone.module.scss';

export const DangerZone = ({ network }) => (
  <div className={cn.dangerZone}>
    <h2 className={cn.title}>Danger zone</h2>
    <div className={cn.container}>
      <div className={cn.warningWrapper}>
        <h2 className={cn.subtitle}>Delete this network</h2>
        <p className={cn.warningText}>
          This will permanently erase all local data for this network, including keys, transactions,
          calls and other. This action cannot be undone.
        </p>
      </div>
      <DeleteModal network={network} />
    </div>
  </div>
);
