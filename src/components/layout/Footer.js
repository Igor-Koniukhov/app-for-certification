import React from "react";

const Footer = ()=>{
    const isSignedIn = window.walletConnection.isSignedIn();
    return (
        <footer className="w-auto text-bg-dark footer">
            {
                isSignedIn &&
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">

                <li>
                    <a href='https://github.com/Igor-Koniukhov/app-for-certification'
                       className="nav-link px-2 text-white"> SourceCode</a>
                </li>
            </ul>}
            <p className="text-center text-muted">© 2022 Company, Inc</p>
        </footer>
    )
}

export default Footer