import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { initContract } from './utils'
import {BrowserRouter} from "react-router-dom";

const homepage = '/app-for-certification'

window.nearInitPromise = initContract()
  .then(() => {
    ReactDOM.render(
        <BrowserRouter basename={homepage}>
            <App />
        </BrowserRouter>,
      document.querySelector('#root')
    )
  })
  .catch(console.error)
