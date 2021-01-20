import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UsersResultListContextProvider from './contexts/UsersResultListContext';

ReactDOM.render(
  <React.StrictMode>
    <UsersResultListContextProvider>
      <App />
    </UsersResultListContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
