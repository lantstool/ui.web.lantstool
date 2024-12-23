import { CopyOutline } from '../icons/CopyOutline.jsx';
import { Button } from '../Button/Button.jsx';
import { CheckCircleOutline } from '../icons/CheckCircleOutline.jsx';
import { useState } from 'react';
import cn from './CopyButton.module.scss';

const types = {
  default: cn.button,
  bordered: cn.buttonBordered,
  small: cn.buttonSmall,
};

const getType = (type) => (type ? types[type] : type['default']);

export const CopyButton = ({
  value,
  disabled = false,
  type = 'default',
  event = 'onMouseDown',
  variant = 'icon',
  button,
  callback = () => {},
}) => {
  const [copied, setCopied] = useState(false);
  const buttonType = getType(type);

  const copyTextToClipboard = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    await navigator.clipboard.writeText(value);
    callback();

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 400);
  };

  const eventHandler =
    event === 'onMouseDown'
      ? { onMouseDown: copyTextToClipboard }
      : { onClick: copyTextToClipboard };

  if (variant === 'button')
    return (
      <Button
        onClick={copyTextToClipboard}
        disabled={disabled}
        size={button?.size}
        IconLeft={() => <span className={copied ? cn.checkCircleOutline : cn.copyOutline} />}
      >
        {button?.label}
      </Button>
    );

  return (
    <button disabled={disabled} type="button" {...eventHandler} className={buttonType}>
      {copied ? <CheckCircleOutline style={cn.icon} /> : <CopyOutline style={cn.icon} />}
    </button>
  );
};
