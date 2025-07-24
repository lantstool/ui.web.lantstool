import { action } from '@react-vault';

export const setList = action(({ slice, payload: list }) => (slice.records = list));
