import cn from './PublicItem.module.css';
import { CopyButton } from '../../../general/CopyButton/CopyButton.tsx';

export const PublicItem = ({ text, label }: any) => {
  return (
    <div className={cn.container}>
      <h2 className={cn.label}>{label}</h2>
      <div className={cn.wrapper}>
        <p className={cn.name}>{text}</p>
        <div className={cn.buttonWrapper}>
          <CopyButton text={text} />
        </div>
      </div>
    </div>
  );
};
