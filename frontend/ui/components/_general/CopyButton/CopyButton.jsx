import cn from './CopyButton.module.scss';
import { CopyOutline } from '../icons/CopyOutline.jsx';

const copyText = (copy) => {
  navigator.clipboard.writeText(copy);
};

export const CopyButton = ({ copy, disabled = false }) => (
  <button disabled={disabled} type="button" onClick={() => copyText(copy)} className={cn.button}>
    <CopyOutline style={cn.icon} />
  </button>
);
