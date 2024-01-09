import { Route, Routes } from 'react-router-dom';
import { Spaces } from './Spaces/Spaces.tsx';
import { Transactions } from './Transactions/Transactions.tsx';
import { Vault } from './Vault/Vault.tsx';
import { Networks } from "./Networks/Networks.tsx";
import cn from './Main.module.css';

export const Main = () => {
  return (
    <div className={cn.container}>
      <Routes>
        <Route path="/spaces/*" element={<Spaces />} />
        <Route path="/networks/*" element={<Networks />} />
        <Route path="/transactions/*" element={<Transactions />} />
        <Route path="/vault/*" element={<Vault />} />
      </Routes>
    </div>
  );
};
