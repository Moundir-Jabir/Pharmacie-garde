import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppContext from "./AppContext";

const token = JSON.parse(localStorage.getItem('token'));

let username;

if (token) {
  username = token.username;
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppContext.Provider value={username} >
      <App />
    </AppContext.Provider>
  </React.StrictMode>
);
