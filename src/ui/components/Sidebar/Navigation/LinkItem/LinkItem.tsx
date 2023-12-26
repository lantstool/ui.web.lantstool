import { Link } from 'react-router-dom';
import cn from './LinkItem.module.css';

export const LinkItem = ({ name, src, to }: any) => {
  return (
    <Link className={cn.container} to={to}>
      <img className={cn.img} alt="#" src={`/${src}.svg`} />
      <h4 className={cn.title}>{name}</h4>
    </Link>
  );
};
