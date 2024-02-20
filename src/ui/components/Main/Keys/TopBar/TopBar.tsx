import cn from './TopBar.module.css';
import { Button } from '../../general/Button/Button.tsx';
import addIcon from '../../../../assets/addIcon.svg';

export const TopBar = ({ openModal }) => {
  return (
    <div className={cn.topBar}>
      <div className={cn.button}>
        <Button text="Import key" onClick={openModal} src={addIcon} style="secondary" />
      </div>
      <h2 className={cn.title}>Key List</h2>
    </div>
  );
};
