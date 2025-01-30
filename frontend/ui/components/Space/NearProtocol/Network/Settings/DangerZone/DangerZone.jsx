import { DeleteModal } from './DeleteModal/DeleteModal.jsx';
import cn from './DangerZone.module.scss';

export const DangerZone = ({ network }) => (
  <div className={cn.dangerZone}>
    <h2 className={cn.title}>Danger zone</h2>
    <div className={cn.container}>
      <div className={cn.warningWrapper}>
        <h2 className={cn.subtitle}>Delete this network</h2>
        <p className={cn.warningText}>
          Are you sure you want to delete this network? This action will permanently remove all data
          within the network, including keys, accounts and more.
        </p>
      </div>
      <DeleteModal network={network} />
    </div>
  </div>
);
