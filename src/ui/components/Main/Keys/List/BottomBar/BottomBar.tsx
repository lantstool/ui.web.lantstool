import cn from './BottomBar.module.css';
import { Button } from '../../../general/Button/Button.tsx';
import addIcon from '../../../../../assets/addIcon.svg';

export const BottomBar = ({ openModal }) => (
  <div className={cn.bottom}>
    <Button text="Import key" onClick={openModal} src={addIcon} style="secondary" />
  </div>
);
