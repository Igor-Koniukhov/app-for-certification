import React from 'react';

const ArticleContext = React.createContext({
    article:0,
    attempt:0,
    answers:[],
    metadata:[],
    isMeta: false,
    chapter: {},
    numberOfQuestions:0,
    isSent: false,
    addAnswer: (article, article_id, answer)=>{},
    getNumbersOfQuestions:(length)=>{},
    resetState:()=>{},
    setRequestStatus: (status)=>{},
    setCollectionAnswers:(answer)=>{},
    setMetadate:(metatada)=>{},
    setAttempt:(attepmt)=>{},
})

export default ArticleContext;