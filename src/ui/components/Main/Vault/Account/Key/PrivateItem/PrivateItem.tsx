import cn from './PrivateItem.module.css';
import { useState } from 'react';
import { hideText } from '../../../../../../../store/vault/helpers/regularExpressions.ts';
import { CopyButton } from '../../../../../general/Buttons/CopyButton/CopyButton.tsx';
import { VisibleButton } from '../../../../../general/Buttons/VisibleButton/VisibleButton.tsx';

export const PrivateItem = ({ name }: any) => {
  const [visible, setVisible] = useState(false);

  const hideName = hideText(name);

  return (
    <div className={cn.privateItem}>
      {!visible ? <p className={cn.hide}>{hideName}</p> : <p className={cn.name}>{name}</p>}
      <div className={cn.buttonWrapper}>
        <VisibleButton visible={visible} setVisible={setVisible} />
        <CopyButton name={name} />
      </div>
    </div>
  );
};
