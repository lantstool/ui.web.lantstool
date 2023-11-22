import {action} from "../../../react-vault";


export const addAccount = action(({ slice, payload }: any) => {
    slice.active = payload.accountId;
    slice.list.push(payload.accountId);
    slice.map[payload.accountId] = []
});