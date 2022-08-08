import {useHistory, NavLink} from "react-router-dom";
import './NavBar.module.css';
import {login, logout} from "../../utils";
import React, {Fragment, useContext, useEffect, useState} from "react";
import ArticleContext from "../../store/article-context";
import errorHelper from "../helper/errorHelper";


const MainNavigation = (props) => {
    const isSignedIn = window.walletConnection.isSignedIn();
    const ctx = useContext(ArticleContext);
    const history = useHistory();
    const { isMeta} = ctx


const isHomepage = history.location.pathname === '/'

    return (

        <Fragment>
            <header className="p-3 text-bg-dark">
                <div className="d-flex flex-wrap align-items-center justify-content-around ">
                    <div className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <div>{window.accountId}</div>

                    </div>
                    {!isSignedIn && <h1 className="main-title">Certificator</h1>}
                    {isSignedIn &&
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li>
                                <NavLink to='/' className="nav-link px-2 text-white">
                                    Subjects
                                </NavLink>

                            </li>
                            <li>
                                <a href='https://github.com/Igor-Koniukhov/app-for-certification'
                                   className="nav-link px-2 text-white"> SourceCode</a>
                            </li>

                            { isMeta &&
                                <li>
                                    <NavLink to='/nft-collections' className="nav-link px-2 text-white">
                                        NFT-collection
                                    </NavLink>

                                </li>
                            }
                        </ul>}
                    {
                        isSignedIn &&
                        <div className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none mx-5">
                            {!isHomepage &&  <span>Attempt: <strong>{ props.attempt}</strong> </span>}
                        </div>
                    }
                    <div className="text-start">
                        {
                            isSignedIn &&
                            <button type="button" className="btn btn-warning logout" onClick={logout}>Logout</button>
                        }

                        {
                            !isSignedIn &&
                            <button type="button" className="btn btn-outline-light me-2" onClick={login}>Login</button>
                        }
                    </div>
                </div>

            </header>

        </Fragment>

    )
};
export default MainNavigation;
