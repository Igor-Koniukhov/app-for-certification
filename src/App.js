import 'regenerator-runtime/runtime';
import React, {useEffect} from 'react';
import {Route, Switch} from "react-router-dom";
import './global.css'
import IntroContent from "./components/IntroContent";
import Content from "./components/Content";
import getConfig from './config';
import Results from "./pages/Results";
import Layout from "./components/layout/Layout";
import Certificate from "./pages/Certificate";
import Home from "./pages/Home"
import NFTCollections from "./pages/NFTCollections";

const {networkId} = getConfig(process.env.NODE_ENV || 'development')
let pageIsLoad = true;

export default function App() {
    const {set_tickets} = window.contract;
    const isSignedIn = window.walletConnection.isSignedIn();

    useEffect(() => {
        const setTickets = async () => {
            await set_tickets({account_id: window.accountId})
                .then((data) => {
                    console.log(data)
                });
        };
        setTickets();
    }, [isSignedIn]);

    useEffect(() => {
        if (isSignedIn) {
            pageIsLoad = false;
            return
        }
    }, [isSignedIn]);

    return (
        <Layout>
            <Switch>
                {!isSignedIn && <IntroContent/>}
                {isSignedIn &&
                    <Route path='/' exact>
                        <Home/>
                    </Route>}
                <Route path='/chemistry'>
                    <Content
                        isLoad={pageIsLoad}
                        networkId={networkId}
                    />
                </Route>}

                <Route path='/results'>
                    <Results/>
                </Route>
                <Route path='/certificate'>
                    <Certificate/>
                </Route>
                <Route path='/nft-collections'>
                    <NFTCollections/>
                </Route>
            </Switch>
        </Layout>
    )
}


