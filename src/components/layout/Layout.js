import React from "react";
import './Layout.module.css';
import NavBar from "./NavBar";
import ArticleProvider from "../../store/ArticleProvider";
import Footer from "./Footer";

const Layout = (props) => {
    return (
        <ArticleProvider>
            <NavBar/>
            <main className='main'>
                {props.children}
            </main>
            <Footer/>
        </ArticleProvider>
    )
};

export default Layout;
