import cn from './PrivateItem.module.css';
import { useState } from 'react';
import { hideText } from '../../../../../../../../store/helpers/hideText.js';
import { CopyButton } from '../../../general/CopyButton/CopyButton.jsx';
import { VisibleButton } from './VisibleButton/VisibleButton.jsx';

export const PrivateItem = ({ text, label }) => {
  const [visible, setVisible] = useState(false);

  const hideName = text && hideText(text);

  return (
    <div className={cn.container}>
      <h2 className={cn.label}>{label}</h2>
      <div className={cn.wrapper}>
        {!visible ? <p className={cn.hide}>{hideName}</p> : <p className={cn.name}>{text}</p>}
        <div className={cn.buttonWrapper}>
          <VisibleButton visible={visible} setVisible={setVisible} />
          <CopyButton text={text} />
        </div>
      </div>
    </div>
  );
};
