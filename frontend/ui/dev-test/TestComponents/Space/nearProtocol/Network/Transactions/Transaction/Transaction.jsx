import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { set } from 'lodash';

// update next for all segments
// createSpace

const updateHistory = (navHistory, path) => {
  path.forEach((segment, index) => {
    if (index >= path.length - 1) return; // Last element is the end segment and doesn't have 'next'
    console.log(path.slice(0, index + 1));
    set(navHistory, [...path.slice(0, index + 1), 'next'], path[index + 1]);
  })
  console.log(navHistory);
};

export const Transaction = ({ navHistory }) => {
  const { spaceId, networkId, transactionId } = useParams();

  useEffect(() => {
    // after success render update history
    // ми можемо отримати цей шлях з історії
    updateHistory(navHistory, [
      '',
      'space',
      spaceId,
      'near-protocol',
      networkId,
      'transactions',
      transactionId,
    ]);
  }, [transactionId]);

  return (
    <div>
      <div>Transaction: {transactionId}</div>
    </div>
  );
};
/*
set(navHistory, ['', 'next'], 'space');
  set(navHistory, ['', 'space', 'next'], spaceId);
  set(navHistory, ['', 'space', spaceId, 'next'], 'near-protocol');
  set(navHistory, ['', 'space', spaceId, 'near-protocol', 'next'], networkId);
  set(navHistory, ['', 'space', spaceId, 'near-protocol', networkId, 'next'], 'transactions');
  set(
    navHistory,
    ['', 'space', spaceId, 'near-protocol', networkId, 'transactions', 'next'],
    transactionId,
  );
  set(
    navHistory,
    ['', 'space', spaceId, 'near-protocol', networkId, 'transactions', transactionId, 'next'],
    null,
  );
 */
