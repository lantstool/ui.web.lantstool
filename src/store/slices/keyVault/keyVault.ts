import { addAccount } from "./actions/addAccount";
import { addKey } from "./effects/addKey";
import { getKeys } from "./effects/getKeys";

export const keyVault = {
  data: 1,
  addAccount,
  addKey,
  getKeys,
};
