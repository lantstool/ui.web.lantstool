import cnm from 'classnames';
import { Button } from '../../Button/Button.jsx';
import cn from './ModalHeader.module.scss';

export const ModalHeader = ({ title, close, classes }) => (
  <div className={cnm(cn.headerContainer, classes?.container && classes.container)}>
    <h3 className={cn.title}>{title}</h3>
    <Button color="tertiary" size="small" iconLeftStyles={cn.icon} onClick={close} />
  </div>
);
