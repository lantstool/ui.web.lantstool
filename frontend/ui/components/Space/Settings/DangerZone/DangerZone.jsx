import { DeleteModal } from './DeleteModal/DeleteModal.jsx';
import cn from './DangerZone.module.scss';

export const DangerZone = ({ space }) => (
  <div className={cn.dangerZone}>
    <h2 className={cn.title}>Danger zone</h2>
    <div className={cn.container}>
      <div className={cn.warningWrapper}>
        <h2 className={cn.subtitle}>Delete this space</h2>
        <p className={cn.warningText}>
          Are you sure you want to delete this space? This action will permanently
          remove all data within the space, including networks, keys and more.
        </p>
      </div>
      <DeleteModal space={space} />
    </div>
  </div>
);
