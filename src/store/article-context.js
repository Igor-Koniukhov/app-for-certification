import React from 'react';

const ArticleContext = React.createContext({
    article:0,
    answers:[],
    chapter: {},
    numberOfQuestions:0,
    addAnswer: (article, article_id, answer)=>{},
    getNumbersOfQuestions:(length)=>{},
})

export default ArticleContext;