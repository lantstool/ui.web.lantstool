import cn from './PublicItem.module.css';
import { CopyButton } from '../../../../../general/Buttons/CopyButton/CopyButton.tsx';

export const PublicItem = ({ name }: any) => {
  return (
    <div className={cn.publicItem}>
      <p className={cn.name}>{name}</p>
      <div className={cn.buttonWrapper}>
        <CopyButton name={name} />
      </div>
    </div>
  );
};
