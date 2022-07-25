import React from "react";
import {NavLink} from "react-router-dom";

const Footer = ()=>{
    const isSignedIn = window.walletConnection.isSignedIn();
    return (
        <footer className="w-auto text-bg-dark footer">
            {
                isSignedIn &&
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                <li>
                    <NavLink to='/'  className="nav-link px-2 text-white">
                        Home
                    </NavLink>

                </li>

                <li>
                    <NavLink to='/source' activeClassName='active' className="nav-link px-2 text-white">
                        Source
                    </NavLink>
                </li>
            </ul>}
            <p className="text-center text-muted">© 2022 Company, Inc</p>
        </footer>
    )
}

export default Footer