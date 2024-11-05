import { EyeHideClosedOutline } from '../../../../../../_general/icons/EyeHideClosedOutline.jsx';
import { EyeShowOutline } from '../../../../../../_general/icons/EyeShowOutline.jsx';
import { CopyButton } from '../../../../../../_general/CopyButton/CopyButton.jsx';
import { useState } from 'react';
import { hideText } from '../../../../../../../../store/helpers/hideText.js';
import cn from './Item.module.scss';

export const Item = ({ label, Icon, isCopy = true, isVisible = true, value }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  return (
    <div>
      <div className={cn.container}>
        <Icon />
        <h2 className={cn.label}>{label}</h2>
      </div>
      <div className={cn.content}>
        <h2 className={!isVisible || show ? cn.title : cn.hideTitle}>
          {!isVisible || show ? value : hideText(value)}
        </h2>
        <div className={cn.btnWrapper}>
          {isVisible &&
            (show ? (
              <button className={cn.button} onClick={handleShow}>
                <EyeHideClosedOutline />
              </button>
            ) : (
              <button className={cn.button} onClick={handleShow}>
                <EyeShowOutline />
              </button>
            ))}
          {isCopy && <CopyButton value={value} />}
        </div>
      </div>
    </div>
  );
};
