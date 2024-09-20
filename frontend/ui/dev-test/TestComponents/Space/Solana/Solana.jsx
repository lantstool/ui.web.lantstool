import { Outlet } from 'react-router-dom';

export const Solana = ({ navHistory }) => {
  return (
    <div>
      Solana Blockchain
      <Outlet />
    </div>
  );
};
