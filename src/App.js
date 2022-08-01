import 'regenerator-runtime/runtime';
import React, { useEffect} from 'react';
import { Route, Switch} from "react-router-dom";
import './global.css'
import IntroContent from "./components/IntroContent";
import Sociology from "./pages/subjects/Sociology";
import Chemistry from "./pages/subjects/Chemistry";
import Physic from "./pages/subjects/Physic";
import Microbiology from "./pages/subjects/Microbiology";
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
                    <Route path='/app-for-certification' exact>
                        <Home/>
                    </Route>}
                <Route path='/app-for-certification/chemistry'>
                    <Chemistry
                        isLoad={pageIsLoad}
                    />
                </Route>
                <Route path='/app-for-certification/sociology'>
                    <Sociology
                        isLoad={pageIsLoad}
                    />
                </Route>
                <Route path='/app-for-certification/physic'>
                    <Physic
                        isLoad={pageIsLoad}
                    />
                </Route>
                <Route path='/app-for-certification/microbiology'>
                    <Microbiology
                        isLoad={pageIsLoad}
                    />
                </Route>
                }

                <Route path='/app-for-certification/results'>
                    <Results/>
                </Route>
                <Route path='/app-for-certification/certificate'>
                    <Certificate/>
                </Route>
                <Route path='/app-for-certification/nft-collections'>
                    <NFTCollections/>
                </Route>
            </Switch>
        </Layout>
    )
}


