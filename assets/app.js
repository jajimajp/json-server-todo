import 'https://unpkg.com/htm@3.1.1/dist/htm.js';
import 'https://unpkg.com/preact@10.22.1/dist/preact.min.module.js';

const html = htm.bind(preact.h);
const App = () => html`<h1>Hello, world!</h1>`;
preact.render(html`<${App} />`, document.body);
