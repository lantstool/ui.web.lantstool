import { utils } from 'near-api-js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';

const truncateNumber = (number) => number.toString().replace(/(\.\d{2})\d*$/, '$1');

export const useAvailableBalance = (accountId) => {
  const { spaceId, networkId } = useParams();
  const [balance, setBalance] = useState(null);
  const getAccountBalance = useStoreEffect(
    (store) => store.nearProtocol.accounts.getAccountBalance,
  );

  useEffect(() => {
    (async () => {
      if (!accountId) return;
      try {
        const balance = await getAccountBalance({ spaceId, networkId, accountId });
        setBalance(truncateNumber(utils.format.formatNearAmount(balance.available)));
      } catch (e) {
        setBalance(null);
      }
    })();
  }, [accountId]);

  return balance;
};
