import 'regenerator-runtime/runtime';
import React, {useContext, useEffect} from 'react';
import {Route, Switch} from "react-router-dom";
import './global.css'
import IntroContent from "./components/IntroContent";
import Sociology from "./pages/subjects/Sociology";
import Chemistry from "./pages/subjects/Chemistry";
import Physic from "./pages/subjects/Physic";
import Microbiology from "./pages/subjects/Microbiology";
import getConfig from './config';
import Results from "./pages/Results";
import Layout from "./components/layout/Layout";
import Certificate from "./pages/Certificate";
import Home from "./pages/Home"
import NFTCollections from "./pages/NFTCollections";
let pageIsLoad = true;

export default function App() {
    const isSignedIn = window.walletConnection.isSignedIn();

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
                    <Route path='/subjects' exact>
                        <Home/>
                    </Route>}
                <Route path='/chemistry'>
                    <Chemistry
                        isLoad={pageIsLoad}
                    />
                </Route>
                <Route path='/sociology'>
                    <Sociology
                        isLoad={pageIsLoad}
                    />
                </Route>
                <Route path='/physic'>
                    <Physic
                        isLoad={pageIsLoad}
                    />
                </Route>
                <Route path='/microbiology'>
                    <Microbiology
                        isLoad={pageIsLoad}
                    />
                </Route>
                }

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


