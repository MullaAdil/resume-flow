// Polyfill Promise.withResolvers for older iOS WebKit / Safari compatibility
if (typeof Promise !== 'undefined' && typeof Promise.withResolvers === 'undefined') {
  Promise.withResolvers = function () {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ResumeProvider } from './context/ResumeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ResumeProvider>
      <App />
    </ResumeProvider>
  </React.StrictMode>,
)

