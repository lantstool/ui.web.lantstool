import { Link } from 'react-router-dom';
import cn from './MethodDescriptioin.module.scss';

export const MethodDescription = ({ description, link }) => (
  <p className={cn.description}>
    {description} Read more in the{' '}
    <Link className={cn.link} target="_blank" to={link}>
      NEAR Documentation
    </Link>
    .
  </p>
);
