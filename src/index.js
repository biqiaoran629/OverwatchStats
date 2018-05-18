import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/grommet-css'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
