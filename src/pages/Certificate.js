import React, {Fragment, useContext, useEffect, useState} from "react";
import ArticleContext from "../store/article-context";
import "./Certificate.module.css"

const Certificate = () => {
    const {
        nft_mint,
        get_current_result
    } = window.contract
    let {answers} = useContext(ArticleContext);
    const answerError = answers === null || answers === undefined
    console.log(answers)
    if (answerError) {
        answers = [];
    }
    const [stateDescription, setUpdatedDescription] = useState('')
    const [enteredRef, setUpdatedRef] = useState('')
    const [enteredTitle, setUpdatedTitle] = useState('')
    const [stateDate, setStateDate]=useState('');
    const [stateResult, setStateResult]=useState({})


    const descriptionHandler = (event) => {
        setUpdatedDescription(event.target.value)
    }
    const refHandler = (event) => {
        setUpdatedRef(event.target.value)
    }
    const titleHandler = (event) => {

        console.log(event.target.value)
    }
    useEffect(() => {
        setUpdatedTitle(window.accountId)
    }, [stateDescription]);
    console.log(stateDescription)


    let ref = "data:image/jpeg;base64,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";


    const mintNFT = async () => {
        await nft_mint(
            {
                token_id: `${Math.random()}-${window.accountId}`,
                metadata: {
                    title: enteredTitle,
                    description: answers.toString(),
                    media: ref,
                },
                receiver_id: window.accountId,
                approval_id: window.accountId,
            },
            300000000000000, // attached GAS (optional)
            new BN("1000000000000000000000000")
        );

    };
    const submitHandler = (event) => {
        event.preventDefault();
        console.log(enteredDescription, enteredRef, enteredTitle);

    }
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    useEffect(()=>{
        const getResults = async ()=>{
            await get_current_result({account_id: window.accountId}).then((data) => {
                setStateResult(data)
                console.log(data, "results")
            })
        }
        getResults();
        setStateDate(today)
    }, [answers])

    console.log(stateResult)
    return (
        <Fragment>
            <div className="container-frame frame stamp">
                <h1 className="header-title">Certificate</h1>
                <h2 className="header-title">Owner:</h2>
                <h3 className="header-title">{window.accountId}</h3>
                <h6 className="header-title">number of points scored:</h6>
                <h6 className="header-title">{stateResult.score}</h6>
                <h6 className="header-title">
                    certificate issued by
                    <strong className="text-decoration-underline"> certificator</strong>
                </h6>
                <h6 className="header-title">date: {stateDate} </h6>
                <button
                    type="submit"
                    className="btn btn-warning d-block mint-button"
                    onClick={mintNFT}
                >
                    Mint NFT
                </button>
            </div>

        </Fragment>

    )
}

export default Certificate;