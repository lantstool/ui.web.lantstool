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
  return type ? types[type] : type['default'];
};

export const CopyButton = ({
  value,
  disabled = false,
  type = 'default',
  event = 'onMouseDown',
}) => {
  const [copied, setCopied] = useState(false);
  const buttonType = getType(type);

  const copyTextToClipboard = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 400);
  };
  const eventHandler =
    event === 'onMouseDown'
      ? { onMouseDown: copyTextToClipboard }
      : { onClick: copyTextToClipboard };

  return (
    <button disabled={disabled} type="button" {...eventHandler} className={buttonType}>
      {copied ? <CheckCircleOutline style={cn.icon} /> : <CopyOutline style={cn.icon} />}
    </button>
  );
};
