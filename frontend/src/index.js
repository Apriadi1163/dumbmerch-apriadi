import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom"
import { QueryClient, QueryClientProvider } from 'react-query'
import { UserContextProvider } from "./context/userContext"
import App from './App';
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
);



