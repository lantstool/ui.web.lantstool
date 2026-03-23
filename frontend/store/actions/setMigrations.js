import { action } from '@react-vault';

export const setMigrations = action(({ slice, payload }) => (slice.migrations = payload));