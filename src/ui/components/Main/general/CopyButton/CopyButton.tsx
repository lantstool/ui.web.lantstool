import cn from './CopyButton.module.css';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';

export const CopyButton = ({ text }: any) => {
  const [copied, setCopied] = useState(false);

  const copyTextToClipboard = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <button onClick={copyTextToClipboard} className={cn.button} type="button">
      {copied ? (
        <DoneOutlinedIcon className={cn.copy} sx={{ fontSize: 20 }} />
      ) : (
        <ContentCopyIcon className={cn.icon} sx={{ fontSize: 20 }} />
      )}
    </button>
  );
};
