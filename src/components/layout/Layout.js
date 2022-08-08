import React, {useContext, useEffect, useState} from "react";
import './Layout.module.css';
import NavBar from "./NavBar";
import ArticleProvider from "../../store/ArticleProvider";
import Footer from "./Footer";
import errorHelper from "../helper/errorHelper";
import ArticleContext from "../../store/article-context";

let pageIsLoad = false

const Layout = (props) => {
    const isSignedIn = window.walletConnection.isSignedIn();
    const {get_num} = window.contract;
    const [countState, setCountState] = useState(0);
    const cnx = useContext(ArticleContext);
    const {isSent} = cnx


    useEffect(() => {
        const getCounter = async () => {
            await get_num({account_id: window.accountId}).then((attempt) => {
                setCountState(attempt === undefined ? 0 : attempt)

            }).catch(err => errorHelper(err))

        }
        cnx.attempt = countState;
        getCounter();
        pageIsLoad = false

    }, [isSignedIn, pageIsLoad || isSent]);

    pageIsLoad = true

    return (
        <ArticleProvider>
            <NavBar attempt={countState}/>
            <main className='main'>
                {props.children}
            </main>
            <Footer/>
        </ArticleProvider>
    )
};

export default Layout;
