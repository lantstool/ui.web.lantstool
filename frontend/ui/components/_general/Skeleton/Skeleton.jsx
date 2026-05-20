import cnm from 'classnames';
import cn from './Skeleton.module.scss';

export const Skeleton = ({ className }) => <span className={cnm(cn.skeleton, className)} />;
