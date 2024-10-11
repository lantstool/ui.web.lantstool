import cn from './BottomBar.module.scss';
import { Button } from '../../../_general/Button/Button.jsx';
import addIcon from '../../../../../../../assets/addIcon.svg';

export const BottomBar = ({ openModal }) => (
  <div className={cn.bottom}>
    <Button text="Import key" onClick={openModal} src={addIcon} style="secondary" />
  </div>
);
