export const addTodo = async (sqlite, db, payload) => {
  const { title, description, completed } = payload;

  const query = `
     INSERT INTO todos (title, description, completed)
     VALUES ('${title}', '${description}', ${completed ? 1 : 0});
    `;

  await sqlite.exec(db, query);
  console.log(`Todo '${title}' added to the database.`);
}
