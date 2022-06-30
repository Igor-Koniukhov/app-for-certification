import 'regenerator-runtime/runtime';
import React from 'react';
import ArticleProvider from "./store/ArticleProvider";

import './global.css'
import IntroContent from "./components/IntroContent";
import Content from "./components/Content";


import getConfig from './config'

const {networkId} = getConfig(process.env.NODE_ENV || 'development')

export default function App() {

    return (
        <ArticleProvider>
            <main>
                {!window.walletConnection.isSignedIn() && < IntroContent/>}
                {window.walletConnection.isSignedIn() && <Content  networkId={networkId}/>}
            </main>
        </ArticleProvider>
    )

}


