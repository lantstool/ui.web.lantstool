import { Button } from '../../../general/Button/Button.tsx';
import addIcon from '../../../../../assets/addIcon.svg';
import cn from './BottomBar.module.css';

export const BottomBar = ({ openModal }) => {
  return (
    <div className={cn.bottom}>
      <Button text="Import key" onClick={openModal} src={addIcon} style="secondary" />
    </div>
  );
};
