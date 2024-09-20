import React, { useState, useEffect } from 'react';

const worker = new Worker(new URL('./backend/worker.js', window.location.origin), {
  type: 'module',
});

export function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const createTable = () => {
    worker.postMessage({ type: 'createTable' });
  };

  const deleteTodosTable = () => {
    worker.postMessage({ type: 'deleteTodosTable' });
  };

  const getTodos = () => {
    worker.postMessage({ type: 'getTodos' });
  };

  const addTodo = () => {
    worker.postMessage({
      type: 'addTodo',
      payload: {
        title: 'ABC',
        description: 'Finish the project by the end of the week',
        completed: false,
      },
    });
  };

  const getTodoById = () => {
    worker.postMessage({ type: 'getTodoById', payload: { todoId: 1 } });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New Todo"
      />
      <button onClick={createTable}>Create table</button>
      <button onClick={deleteTodosTable}>Delete Todos Table</button>
      <button onClick={addTodo}>Add Todo</button>
      <button onClick={getTodos}>Get Todos</button>
      <button onClick={getTodoById}>Get Todo ID 1</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo[1]}</li>
        ))}
      </ul>
    </div>
  );
}
