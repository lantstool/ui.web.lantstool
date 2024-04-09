import { action } from '../../../../react-vault';

export const resetState = action(({ slice }: any) => {
  slice.ids = [];
  slice.records = {};
  slice.isAccountsLoadedToState = false;
});
