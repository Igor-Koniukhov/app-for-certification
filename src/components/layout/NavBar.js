import {NavLink} from "react-router-dom";
import './NavBar.module.css';
import {login, logout} from "../../utils";
import React, {useContext, useEffect, useState} from "react";
import ArticleContext from "../../store/article-context";
import errorHelper from "../helper/errorHelper";



const MainNavigation = () => {
    const [countState, setCountState]=useState(0);
    const isSignedIn = window.walletConnection.isSignedIn();
    const ctx = useContext(ArticleContext);
    console.log(ctx.isSent, " isSent")

    const {
        get_num
    }=window.contract

    const getCounter = async () => {
        let count = await get_num({args: {}})
            .catch(err => errorHelper(err))
        setCountState(count === undefined ? 'calculating...' : count)
    }
    const {isSent}=ctx
    useEffect(() => {
            getCounter()
            console.log(isSent)
        ctx.isSent=false

    }, [isSent]);


    return (
        <header className='header'>
            <div className='account'>{window.accountId}</div>
            <nav className='nav'>
                <ul>
                    <li>
                        {
                            isSignedIn &&
                            <NavLink to='/source' activeClassName='active'>
                                Source
                            </NavLink>
                        }
                    </li>

                </ul>
                {
                    isSignedIn &&
                    <button className='nav-btn' onClick={logout}>Sign out</button>
                }
                {
                    !isSignedIn &&
                    <button onClick={login}>Sign in</button>
                }
            </nav>

            {isSignedIn && <div>{countState}</div>}

        </header>
    )
};
export default MainNavigation;
