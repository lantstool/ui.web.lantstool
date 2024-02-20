import { action } from '../../../../react-vault';

export const setKey = action(({ slice, payload }: any) => {
    slice.ids.push(payload.publicKey);
    slice.records[payload.publicKey] = payload;
});
