import React, { useReducer} from "react";
import ArticleContext from "./article-context";


const defaultArticleState={
    article: 0,
    attempt: 0,
    answers: [],
    metadata:[],
    isMeta: false,
    chapter: {},
    numberOfQuestions: 0,
    isSent: false
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
            attempt: state.attempt,
            article: currentIdArticle,
            isMeta: state.isMeta,
            metadata: state.metadata,
            chapter: updatedChapter,
            numberOfQuestions:state.numberOfQuestions,
            isSent: state.isSent
        }
    }

    if(action.type==='GET_NUMBERS_OF_QUESTIONS'){
        const updatedNumbersOfQuestions= state.numberOfQuestions + action.length
        return {
            answers: state.answers,
            attempt: state.attempt,
            article: state.article,
            isMeta: state.isMeta,
            metadata: state.metadata,
            chapter: state.chapter,
            numberOfQuestions: updatedNumbersOfQuestions,
            isSent: state.isSent
        }
    }
    if(action.type==='RESET'){
        return defaultArticleState
    }
    if(action.type === 'SET_STATUS'){
        const updatedStatus = action.isSent
        return {
            answers: state.answers,
            attempt: state.attempt,
            article: state.article,
            isMeta: state.isMeta,
            metadata: state.metadata,
            chapter: state.chapter,
            numberOfQuestions: state.numberOfQuestions,
            isSent: updatedStatus
        }

    }
    if(action.type === 'SET_ANSWERS'){
        const updatedAnswers= action.answers

        return {
            answers: updatedAnswers,
            attempt: state.attempt,
            article: state.article,
            isMeta: state.isMeta,
            metadata: state.metadata,
            chapter: state.chapter,
            numberOfQuestions: state.numberOfQuestions,
            isSent: state.isSent
        }

    }
    if(action.type === 'SET_METADATA'){
        const updatedMetaData= action.metadata
        const isMeta = action.isMeta

        return {
            answers: state.answers,
            attempt: state.attempt,
            article: state.article,
            isMeta: isMeta,
            metadata: updatedMetaData,
            chapter: state.chapter,
            numberOfQuestions: state.numberOfQuestions,
            isSent: state.isSent
        }

    }
    if(action.type === 'SET_ATTEMPT'){
        const updateAttempt= action.attempt

        return {
            answers: state.answers,
            attempt: updateAttempt,
            article: state.article,
            isMeta: state.isMeta,
            metadata: state.metadata,
            chapter: state.chapter,
            numberOfQuestions: state.numberOfQuestions,
            isSent: state.isSent
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
const resetStateHandler=()=>{
        dispatchArticleAction({
            type: 'RESET',
        })
    }
const setRequestStatusHandler = (isSent) =>{
        dispatchArticleAction({
            type: 'SET_STATUS',
            isSent: isSent
        })
}
const setCollectionAnswersHandler =(answers)=>{
        dispatchArticleAction({
            type: 'SET_ANSWERS',
            answers: answers,
        })


}
const setMetadataHandler = (metadata, isMeta)=>{
        dispatchArticleAction({
            type:'SET_METADATA',
            metadata: metadata,
            isMeta: isMeta,
        })
}
const setAttemptHandler =(attempt)=>{
        dispatchArticleAction({
            type: 'SET_ATTEMPT',
            attempt: attempt,
        })
}

    const articleContext = {
        article: articleState.article,
        attempt: articleState.attempt,
        answers: articleState.answers,
        isMeta: articleState.isMeta,
        metadata: articleState.metadata,
        chapter: articleState.chapter,
        numberOfQuestions: articleState.numberOfQuestions,
        isSent: articleState.isSent,
        addAnswer: addAnswersHandler,
        getNumbersOfQuestions: getNumbersOfQuestionsHandler,
        setRequestStatus: setRequestStatusHandler,
        setCollectionAnswers: setCollectionAnswersHandler,
        setMetadate: setMetadataHandler,
        setAttempt: setAttemptHandler,
        resetState: resetStateHandler
    }
    return <ArticleContext.Provider value={articleContext}>
        {props.children}
            </ArticleContext.Provider>

}

export default ArticleProvider;