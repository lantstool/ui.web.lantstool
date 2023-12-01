import { action } from "../../../react-vault";

export const getAccessKeyList = action(({ slice, payload }: any) => {
  slice.accessKeyList = payload.keys
});