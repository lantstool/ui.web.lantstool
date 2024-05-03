import { Button } from '../../../general/Button/Button.jsx';
import addIcon from '../../../../../assets/addIcon.svg';
import cn from './BottomBar.module.css';

export const BottomBar = ({ openModal }) => (
  <div className={cn.bottom}>
    <Button text="Import Account" onClick={openModal} src={addIcon} style="secondary" />
  </div>
);
