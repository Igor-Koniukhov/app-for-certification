import React from 'react';

const ArticleContext = React.createContext({
    article:0,
    answers:[],
    chapter: {},
    numberOfQuestions:0,
    isSent: false,
    addAnswer: (article, article_id, answer)=>{},
    getNumbersOfQuestions:(length)=>{},
    setRequestStatus: (status)=>{},
    setCollectionAnswers:(answer)=>{},
})

export default ArticleContext;