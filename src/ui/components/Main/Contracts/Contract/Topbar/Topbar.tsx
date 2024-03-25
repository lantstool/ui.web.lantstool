import cn from './Topbar.module.css';
import { SideMenu } from './SideMenu/SideMenu.tsx';
import { useMemo } from 'react';

const getFormDefaultValues = (contract: any) => {
  return {
    contractId: contract.contractId,
    name: contract.name,
  };
};

export const Topbar = ({ contract, contractId }: any) => {
  const formDefaultValues = useMemo(() => getFormDefaultValues(contract), [contract]);
  const { name } = formDefaultValues;

  return (
    <div className={cn.topbar}>
      <h1 className={cn.name}>{name}</h1>
      <div className={cn.sideMenu}>
        <SideMenu contractId={contractId} />
      </div>
    </div>
  );
};
