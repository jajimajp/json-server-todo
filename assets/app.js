import { h, render } from 'https://unpkg.com/preact@latest?module';
import { useState, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm@3.1.1/dist/htm.module.js?module';
const html = htm.bind(h);

const api = {
  getTodos: async () => {
    const res = await fetch('/todos');
    if (!res.ok) {
      throw new HTTPError(`Error: ${res.statusText}`);
    }
    return await res.json();
  },
  postTodos: async (todo) => {
    const res = await fetch('/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      throw new HTTPError(`Error: ${res.statusText}`);
    }
    return await res.json();
  },
};

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    api
      .getTodos()
      .then(res => setTodos(res));
  }, [api, setTodos]);

  const handleChange = (e) => setNewTodo(e.target.value);
  const handleClick = () => {
    if (newTodo !== '') {
      const title = newTodo;
      api
        .postTodos({ title })
        .then((res) => {
          setTodos([...todos, res]);
          setNewTodo('');
        });
    }
  };

  return html`
    <div>
      <h1>ToDos</h1>
      <input type="text" value=${newTodo} onChange=${handleChange} />
      <button onClick=${handleClick}>Add</button>
      <ul>
        ${todos.map((todo) => html`
          <li key=${todo.id}>${todo.title}</li>
        `)}
      </ul>
    </div>
  `;
}

render(html`<${App} />`, document.body);
