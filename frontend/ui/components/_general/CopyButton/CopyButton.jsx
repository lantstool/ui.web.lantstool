import { CopyOutline } from '../icons/CopyOutline.jsx';
import { CheckCircleOutline } from '../icons/CheckCircleOutline.jsx';
import { useState } from 'react';
import cn from './CopyButton.module.scss';

export const CopyButton = ({ color = 'primary', copy, disabled = false }) => {
  const [copied, setCopied] = useState(false);

  const copyTextToClipboard = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(copy);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const iconColor = color === 'primary' ? cn.icon : cn.iconSecondary;

  return (
    <button disabled={disabled} type="button" onClick={copyTextToClipboard} className={cn.button}>
      {copied ? <CheckCircleOutline style={iconColor} /> : <CopyOutline style={iconColor} />}
    </button>
  );
};
