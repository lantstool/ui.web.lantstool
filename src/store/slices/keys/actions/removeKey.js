import {action} from "../../../../react-vault";


export const removeKey = action(({ slice, payload }) => {
    slice.ids = slice.ids.filter((keyId) => keyId !== payload);
    delete slice.records[payload];
});
