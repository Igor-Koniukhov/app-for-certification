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

const {networkId} = getConfig(process.env.NODE_ENV || 'development')
let pageIsLoad = true;

export default function App() {
    const {set_tickets} = window.contract;
    const isSignedIn = window.walletConnection.isSignedIn();

    useEffect(() => {
        const setTickets = async () => {
            await set_tickets().then((data) => {
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
            </Switch>
        </Layout>
    )
}


