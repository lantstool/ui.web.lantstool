import { Link } from 'react-router-dom';
import { useSaveToHistory } from '@hooks/useSaveToHistory.js';
import cn from './SelectBlockchain.module.scss';

export const SelectBlockchain = () => {
  useSaveToHistory();
  return (
    <div className={cn.container}>
      <h1>Select Blockchain</h1>
      <Link to="../near-protocol" relative="path">
        Near Protocol
      </Link>
    </div>
  );
};
