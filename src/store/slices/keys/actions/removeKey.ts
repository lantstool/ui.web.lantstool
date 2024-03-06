import {action} from "../../../../react-vault";


export const removeKey = action(({ slice, payload }: any) => {
    slice.ids = slice.ids.filter((keyId: string) => keyId !== payload);
    delete slice.records[payload];
});
