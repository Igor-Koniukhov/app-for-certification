import React, {Fragment, useEffect, useState} from "react";

import "./Home.module.css";
import ChemistryImage from "../img/subject/IUPAC-feature-image.png";
import PhysicImage from "../img/subject/physic.png";
import SociologyImage from "../img/subject/sociology.png";
import MicroBiologyImage from "../img/subject/microbiology.png"
import SubjectItemButton from "../components/UI/SubjectItemButton";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const Home = () => {
    const {new_default_meta} = window.contract;
    const [stateSpinner, setStateSpinner] = useState(false);
    const {
        set_subjects,
    } = window.contract;
    const [stateResponseStatus, setStateResponseStatus] = useState(false);
    const [stateIsInit, setStateIsInit]=useState(false);

    const subjectRange = [
        {
            path: '/chemistry',
            img: ChemistryImage,
        },
        {
            path: '/physic',
            img: PhysicImage,
        },
        {
            path: '/sociology',
            img: SociologyImage,
        },
        {
            path: '/microbiology',
            img: MicroBiologyImage
        }
    ]

    const initContractHandler = () => {
        setStateSpinner(true)
        const initContract = async () => {
            await new_default_meta({owner_id: window.accountId}).then((data) => {
                if (data !== undefined || data !== null) {
                    setStateSpinner(false)
                    setStateIsInit(true)
                }
            }).then(()=>{
                const setSubjects = async () => {
                    await set_subjects({}).then((data) => {
                        console.log(data.message)
                        setStateResponseStatus(data.ok)
                    })
                }
                setSubjects();
            })
        }

        initContract();
    }

    console.log(stateResponseStatus)
    return (
        <Fragment>
            <div className="container text-center pt-5 ">
                <h1>Welcome to Examinator</h1>
                {
                    <Fragment>
                    <p>Choose your subject and start exam</p>
                    <small>At that moment, working only on chemistry exams. On click start initialization of the
                        Contract
                        that fiche added temperately for the test-net period. If after initialization spinner time is to
                        long - reload the page.
                    </small>
                    <div className="row justify-content-center">
                        {subjectRange.map((sbj, index) =>
                            <SubjectItemButton
                                key={index}
                                image={sbj.img}
                                path={sbj.path}
                            />
                        )}
                    </div>
                </Fragment>}

                {

                    <button className="btn btn-danger mt-4" onClick={initContractHandler}>Init contract</button>
                }

            </div>
            {stateSpinner &&
                (
                    <div className='backdrop'>
                        <LoadingSpinner/>
                    </div>
                )
            }

        </Fragment>
    )

}

export default Home;