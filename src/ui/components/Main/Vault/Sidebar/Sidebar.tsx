import cn from './Sidebar.module.css';
import cnm from 'classnames';
import { AddAccount } from './AddAccount/AddAccount.tsx';
import { NavLink, useMatch } from 'react-router-dom';
import { replaceDotsToString } from '../../../../../store/slices/vault/helpers/regularExpressions.ts';

export const Sidebar = ({ list }: any) => {
  const match: any = useMatch('/vault/:accountId');

  return (
    <div className={cn.sidebar}>
      <input className={cn.search} />
      <div className={cn.wrapper}>

        {list.map((id: any) => (
          <NavLink
            key={id}
            to={`/vault/${replaceDotsToString(id)}`}
            className={cnm(
              cn.textWrapper,
              replaceDotsToString(id) === match?.params?.accountId && cn.active,
            )}
          >
            <p className={cn.title}>{id}</p>
          </NavLink>
        ))}
      </div>
      <AddAccount list={list} />
    </div>
  );
};
