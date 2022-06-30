import React, { useReducer} from "react";
import ArticleContext from "./article-context";

const defaultArticleState ={
    article: 0,
    answers: [],
    chapter: {},
    numberOfQuestions:0
}

const articleReducer = (state, action) =>{
    if (action.type ==='ADD_ANSWER'){

        const currentIdArticle = action.article
        const updatedAnswers = [...state.answers, action.answer]
        const updatedChapter={}
        if(action.article===action.article_id){
            updatedChapter[action.article]=updatedAnswers
        }
        return {
            answers: updatedAnswers,
            article: currentIdArticle,
            chapter: updatedChapter,
            numberOfQuestions: state.numberOfQuestions

        }
    }

    if(action.type==='GET_NUMBERS_OF_QUESTIONS'){
        const updatedNumbersOfQuestions= state.numberOfQuestions + action.length
        return {
            ...defaultArticleState,
            numberOfQuestions: updatedNumbersOfQuestions
        }
    }
    return defaultArticleState;
}

const ArticleProvider = (props)=>{
    const [articleState, dispatchArticleAction]=useReducer(articleReducer, defaultArticleState);
    const addAnswersHandler = (answer, article, article_id)=>{
        dispatchArticleAction({
            type: 'ADD_ANSWER',
            article: article,
            answer: answer,
            article_id: article_id,
        })
    }
const getNumbersOfQuestionsHandler=(length)=>{
        dispatchArticleAction({
            type: 'GET_NUMBERS_OF_QUESTIONS',
            length: length
        })
    }


    const articleContext = {
        article: articleState.article,
        answers: articleState.answers,
        chapter: articleState.chapter,
        numberOfQuestions: articleState.numberOfQuestions,
        addAnswer: addAnswersHandler,
        getNumbersOfQuestions: getNumbersOfQuestionsHandler
    }
    return <ArticleContext.Provider value={articleContext}>
        {props.children}
            </ArticleContext.Provider>

}

export default ArticleProvider;