import {action} from "../../../react-vault";

export const removeAccount = action(({ slice, payload }: any) => {
    console.log(payload);
    console.log(slice.list = slice.list.filter((accId: string) => accId !== payload))
    delete slice.map[payload];
    slice.active = slice.list[0];
});