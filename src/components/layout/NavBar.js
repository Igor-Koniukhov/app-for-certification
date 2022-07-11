import {NavLink} from "react-router-dom";
import './NavBar.module.css';
import {login, logout} from "../../utils";
import React from "react";

const MainNavigation = () => {
    const isSignedIn = window.walletConnection.isSignedIn();
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
        </header>
    )
};
export default MainNavigation;
