import {action} from "../../../react-vault";

export const removeAccount = action(({ slice, payload }: any) => {
    const index = slice.list.indexOf(payload.accountId);
    slice.list.splice(index, 1);
    delete slice.map[payload.accountId];
    slice.active = slice.list[0];
});