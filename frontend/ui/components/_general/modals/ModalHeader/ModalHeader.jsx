import cnm from 'classnames';
import { Button } from '../../Button/Button.jsx';
import { CloseCircleOutline } from '../../icons/CloseCircleOutline.jsx';
import cn from './ModalHeader.module.scss';

export const ModalHeader = ({ title, close, classes }) => (
  <div className={cnm(cn.headerContainer, classes?.container && classes.container)}>
    <h3 className={cn.title}>{title}</h3>
    <Button color="tertiary" size="small" IconLeft={CloseCircleOutline} onClick={close} />
  </div>
);
