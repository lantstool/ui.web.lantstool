import { effect } from '@react-vault';

export const checkMigrations = effect(async ({ store }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const setMigration = store.getActions((store) => store.setMigrations);

  try {
    const migration = await backend.sendRequest('db.checkMigrations');
    setMigration(migration);
    return migration;
  } catch (e) {
    console.log(e);
  }
});
