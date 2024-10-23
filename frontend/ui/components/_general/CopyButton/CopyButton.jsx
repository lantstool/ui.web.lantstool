import { CopyOutline } from '../icons/CopyOutline.jsx';
import { CheckCircleOutline } from '../icons/CheckCircleOutline.jsx';
import { useState } from 'react';
import cn from './CopyButton.module.scss';

const types = {
  default: cn.button,
  bordered: cn.buttonBordered,
  small: cn.buttonSmall,
};

const getType = (type) => {
  return type? types[type]: type['default'];
};

export const CopyButton = ({ copy, disabled = false, type = 'default' }) => {
  const [copied, setCopied] = useState(false);
  const buttonType = getType(type);

  const copyTextToClipboard = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(copy);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 400);
  };

  return (
    <button disabled={disabled} type="button" onClick={copyTextToClipboard} className={buttonType}>
      {copied ? <CheckCircleOutline style={cn.icon} /> : <CopyOutline style={cn.icon} />}
    </button>
  );
};
