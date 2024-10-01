import cn from './PublicItem.module.css';
import { CopyButton } from '../../../_general/CopyButton/CopyButton.jsx';

export const PublicItem = ({ text, label }) => {
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
