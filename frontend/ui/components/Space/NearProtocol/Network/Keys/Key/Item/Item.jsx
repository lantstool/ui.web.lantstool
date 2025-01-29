import { CopyButton } from '../../../../../../_general/CopyButton/CopyButton.jsx';
import { useState } from 'react';
import { hideText } from '../../../../../../../../store/helpers/hideText.js';
import cn from './Item.module.scss';

export const Item = ({ label, icon, isCopy = true, isVisible = true, value }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  return (
    <div>
      <div className={cn.container}>
        <span className={icon} />
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
                <span className={cn.hideEye} />
              </button>
            ) : (
              <button className={cn.button} onClick={handleShow}>
                <span className={cn.showEye} />
              </button>
            ))}
          {isCopy && <CopyButton value={value} />}
        </div>
      </div>
    </div>
  );
};
