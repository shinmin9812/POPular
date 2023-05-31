import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import { Provider } from "react-redux";
// import store from './store/index.ts'

import { worker } from './mocks/worker';
if (process.env.NODE_ENV === 'development') {
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <App />
    {/* </Provider> */}
  </React.StrictMode>,
);
