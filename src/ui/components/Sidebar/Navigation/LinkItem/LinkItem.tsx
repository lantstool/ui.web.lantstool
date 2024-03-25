import { Link } from 'react-router-dom';
import cn from './LinkItem.module.css';
import { useStoreState } from '../../../../../react-vault';
import cnm from 'classnames';

export const LinkItem = ({ name, src, to }: any) => {
  const route: any = useStoreState((store: any) => store.navigation.route);

  //The second word after / is responsible for the navigation of our Sidebar
  const isActive = route.split('/')[2] === to;

  return (
    <Link className={cnm(cn.container, isActive && cn.active)} to={to}>
      <img className={cn.img} alt="#" src={src} />
      <h4 className={cn.title}>{name}</h4>
    </Link>
  );
};
