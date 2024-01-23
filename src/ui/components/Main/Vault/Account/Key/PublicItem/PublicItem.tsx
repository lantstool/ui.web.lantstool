import cn from './PublicItem.module.css';
import { CopyButton } from '../../../../general/CopyButton/CopyButton.tsx';

export const PublicItem = ({ text }: any) => {
  return (
    <div className={cn.publicItem}>
      <p className={cn.name}>{text}</p>
      <div className={cn.buttonWrapper}>
        <CopyButton text={text} />
      </div>
    </div>
  );
};
