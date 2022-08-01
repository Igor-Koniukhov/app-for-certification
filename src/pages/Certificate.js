import React, {Fragment, useEffect, useRef, useState, useContext} from "react";
import "./Certificate.module.css"
import LoadingSpinner from "../components/UI/LoadingSpinner";
import {useReactToPrint} from "react-to-print";
import {toJpeg} from 'html-to-image';
import ArticleContext from "../store/article-context";

const BN = require("bn.js");
const pageStyle = `
  @page {
    size: 210mm 297mm;
  }

  @media all {
    .pagebreak {
      display: none;
    }
  }

  @media print {
    .pagebreak {
      page-break-before: always;
    }
  }
`;

const Certificate = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const {setMetadate }=useContext(ArticleContext)

    const {
        nft_mint,
        get_current_result,
        get_token_metadate,
    } = window.contract
    const [stateDate, setStateDate] = useState('');
    const [stateResult, setStateResult] = useState({})
    const isResult = stateResult.answers !== undefined && stateResult.answers !== null;

    const [stateDataUrl, setStateDataUrl] = useState('');
    const node = document.getElementById('screenshot');

    useEffect(() => {
        toJpeg(node, {quality: 0.8})
            .then((dataUrl) => {
                setStateDataUrl(dataUrl)
            })
            .catch((error) => {
                console.error('oops, something went wrong!', error);
            });
    }, [isResult])

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    const description = ` That certificate of achievement is presented to ${window.accountId}, for passing the exam with score: ${stateResult.score}. Date: ${today}`

    const mintNFT = async () => {
        await nft_mint(
            {
                token_id: `${stateResult.attempt}-${window.accountId}`,
                metadata: {
                    title:`${stateResult.subject_name}-${window.accountId}`,
                    description: description,
                    media: stateDataUrl,
                },
                receiver_id: window.accountId,
                approval_id: window.accountId,
            },
            300000000000000, // attached GAS (optional)
            new BN("1000000000000000000000000")
        );

    };
    useEffect(() => {
        const getResults = async () => {
            await get_current_result({account_id: window.accountId}).then((data) => {
                setStateResult(data)
            })
        }
        getResults();
        setStateDate(today)
    }, [isResult])
    useEffect(() => {
        const getTokenMetadata = async () => {
            await get_token_metadate({}).then((data) => {
                if (data.length > 0){
                    setMetadate(data, true)
                }

            })
        }
        getTokenMetadata();

    }, [isResult])

    return (
        <Fragment>
            <style type="text/css" media="print">{" @page {size: landscape;}"}</style>
            <div ref={componentRef}>
                <style> {pageStyle}</style>
                <div>
                    <div className="container-frame frame stamp">
                        <h1 className="header-title">Certificate</h1>
                        <p className="header-title">for achievement in exam of {stateResult.subject_name}</p>
                        <h2 className="header-title">Owner:</h2>
                        <h3 className="header-title">{window.accountId}</h3>
                        <h4 className="header-title">number of points scored:</h4>
                        <h5 className="header-title header-title_font-size">{stateResult.score}</h5>
                        <h6 className="header-title">
                            certificate issued by
                            <strong className="text-decoration-underline"> certificator</strong>
                        </h6>
                        <h6 className="header-title">date: {stateDate} </h6>
                    </div>
                    <div/>
                </div>
            </div>
            <div className="container pt-5">
                <div className="row  justify-content-center">

                    <button
                        onClick={handlePrint}
                        className="btn btn-warning d-inline-block col-md-3 m-1">Print out
                    </button>
                    <button
                        type="submit"
                        className="btn btn-warning d-inline  col-md-3 m-1"
                        onClick={mintNFT}
                    >
                        Mint NFT
                    </button>

                </div>
            </div>

            <div id="screenshot" >
                <div className="container-frame-nft frame-nft stamp-nft">
                    <h1 className="header-title-nft">Certificate</h1>
                    <p className="p-header-title-nft">for achievement in exam of {stateResult.subject_name}</p>
                    <h2 className="header-title-nft">Owner:</h2>
                    <h3 className="header-title-nft">{window.accountId}</h3>
                    <h6 className="header-title-nft">number of points scored:</h6>
                    <h6 className="header-title-nft header-title_font-size">{stateResult.score}</h6>
                    <h6 className="header-title-nft">
                        certificate issued by
                        certificator
                    </h6>
                    <h6 className="header-title-nft">date: {stateDate} </h6>

                </div>
                <div/>
            </div>
            {!isResult &&
                <div className='backdrop'>
                    <LoadingSpinner/>
                </div>
            }

        </Fragment>


    )
}

export default Certificate;