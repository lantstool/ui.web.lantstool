import cn from './Sidebar.module.css';
import cnm from 'classnames';
import { AddAccount } from './AddAccount/AddAccount.tsx';
import { NavLink, useMatch } from 'react-router-dom';
import {replaceDotsToString} from "../../../../../store/vault/helpers/replaceDots.ts";

export const Sidebar = ({ list }: any) => {
  const match: any = useMatch('/vault/:accountId');

  return (
    <div className={cn.container}>
      <div className={cn.wrapper}>
        {list.map((id: any) => (
          <NavLink
            key={id}
            to={`/vault/${replaceDotsToString(id)}`}
            className={cnm(
              cn.text,
                replaceDotsToString(id) === match?.params?.accountId && cn.active,
            )}
          >
            {id}
          </NavLink>
        ))}
      </div>
      <AddAccount list={list} />
    </div>
  );
};
