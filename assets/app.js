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
  postTodo: async (todo) => {
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
  deleteTodo: async (todo) => {
    const res = await fetch(`/todos/${todo.id}`, {
      method: 'DELETE',
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
        .postTodo({ title, completed: false })
        .then((res) => {
          setTodos([...todos, res]);
          setNewTodo('');
        });
    }
  };
  const deleteTodo = (todo) => {
    api
      .deleteTodo(todo)
      .then(() => {
        setTodos([...todos.filter(({ id }) => id !== todo.id)]);
      });
  };

  return html`
    <div>
      <h1>ToDos</h1>
      <input type="text" value=${newTodo} onChange=${handleChange} />
      <button onClick=${handleClick}>Add</button>
      <${TodoList} todos=${todos} deleteTodo=${deleteTodo} />
    </div>
  `;
}

const TodoList = ({ todos, deleteTodo }) => html`
  <ul>
    ${todos.map((todo) => html`
      <${TodoItem} key=${todo.id} todo=${todo} deleteTodo=${() => deleteTodo(todo)} />
    `)}
  </ul>
`;

const TodoItem = ({ todo, deleteTodo }) => {
  return html`
    <li>
      <input type="checkbox" checked=${todo.completed} />
      ${todo.title}
      <button onClick=${deleteTodo}>Delete</button>
    </li>
  `;
};

render(html`<${App} />`, document.body);
