import React from "react";
import './Layout.module.css';
import NavBar from "./NavBar";
import ArticleProvider from "../../store/ArticleProvider";

const Layout = (props) => {
    return (
        <ArticleProvider>
            <NavBar/>
            <main className='main'>
                {props.children}
            </main>
        </ArticleProvider>
    )
};

export default Layout;
