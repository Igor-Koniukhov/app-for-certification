import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { initContract } from './utils'
import { HashRouter} from "react-router-dom";

window.nearInitPromise = initContract()
  .then(() => {
    ReactDOM.render(
        <HashRouter>
            <App />
        </HashRouter>,
      document.querySelector('#root')
    )
  })
  .catch(console.error)
