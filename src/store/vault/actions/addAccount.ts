import {action} from "../../../react-vault";


export const addAccount = action(({ slice, payload }: any) => {
    slice.list.push(payload.accountId);
    slice.map[payload.accountId] = []
});