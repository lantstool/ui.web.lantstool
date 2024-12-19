import { effect } from '@react-vault';
import { methods } from '../helpers/methods/index.js';

export const importOneFromJson = effect(async ({ store, slice, payload }) => {
  const { spaceId, networkId, formValues } = payload;
  const [backend] = store.getEntities((store) => store.backend);

  try {
    console.log(formValues);
  } catch (e) {
    console.log(e);
  }
});
