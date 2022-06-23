import 'regenerator-runtime/runtime'
import React from 'react'
import {login, logout} from './utils'
import './global.css'
import IntroContent from "./components/IntroContent";
import Content from "./components/Content";


import getConfig from './config'

const {networkId} = getConfig(process.env.NODE_ENV || 'development')

export default function App() {

    return (
        <main>
            {!window.walletConnection.isSignedIn() && < IntroContent login={login}/>}
            {window.walletConnection.isSignedIn() && <Content logout={logout} networkId={networkId}/>}
        </main>
    )

}


