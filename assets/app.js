import { h, Component, render } from 'https://unpkg.com/preact@latest?module';
import { useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm@3.1.1/dist/htm.module.js?module';
const html = htm.bind(h);

const initialTodos = [
  { id: 1, name: 'First task' },
  { id: 2, name: 'Second task' },
  { id: 3, name: 'Third task' },
];

const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState('');
  const handleChange = (e) => setNewTodo(e.target.value);
  const handleClick = () => {
    if (newTodo !== '') {
      const name = newTodo;
      setTodos([...todos, { id: todos.length + 1, name }]);
      setNewTodo('');
    }
  };

  return html`
    <div>
      <h1>ToDos</h1>
      <input type="text" value=${newTodo} onChange=${handleChange} />
      <button onClick=${handleClick}>Add</button>
      <ul>
        ${todos.map((todo) => html`
          <li key=${todo.id}>${todo.name}</li>
        `)}
      </ul>
    </div>
  `;
}

render(html`<${App} />`, document.body);
