import { utils, connect } from 'near-api-js';
import { effect } from '../../../react-vault';
import { v4 } from 'uuid';

/*
Seed Phrase
help beach east chest broccoli innocent tag vast teach sock thought song
Public Key
ed25519:FSQoYfUzt2tyjvehHbRbJMTZDYwzBSWwz9ffJ7Ek1PRM
Secret Key
ed25519:4w8xiKhVakjox5GeLDZEXf3aKUUuW2fyAc6Zn4WPmFjLch3W1J4qgLa5GsDDCMbA8d22tJ81Jzh4q9Yg6cnNt2MR
 */

export const onSendTransaction = effect(async ({ payload, slice, store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const addTransaction = slice.getActions((slice: any) => slice.addTransaction);

  try {
    const acc = utils.PublicKey.fromString(
      'ed25519:FSQoYfUzt2tyjvehHbRbJMTZDYwzBSWwz9ffJ7Ek1PRM',
    ).data;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log(acc.toString('hex'));

    const near = await connect({
      networkId: 'testnet',
      nodeUrl: 'https://rpc.testnet.near.org',
    });

    const response = await near.connection.provider.query({
      request_type: 'view_access_key_list',
      finality: 'final',
      account_id: 'd6860d00556d96650c02c061bbc189308a1d90e18e615ea385a7e886dbbdf36c',
    });

    console.log(response);
  } catch (e) {
    console.log(e);
  }
});
