import React, {Fragment, useEffect, useState} from "react";

import "./Home.module.css";
import ChemistryImage from "../img/subject/IUPAC-feature-image.png";
import PhysicImage from "../img/subject/physic.png";
import SociologyImage from "../img/subject/sociology.png";
import MicroBiologyImage from "../img/subject/microbiology.png"
import SubjectItemButton from "../components/UI/SubjectItemButton";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const Home = () => {

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
            await new_default_data({owner_id: window.accountId}).then((data) => {
                if (data !== undefined || data !== null) {
                    setStateSpinner(false)
                    setStateIsInit(true)
                }
            }).then(()=>{
                const setSubjects = async () => {
                    await set_subjects({})
                }
                setSubjects();
            })
        }
        initContract();
    }

    return (
        <Fragment>
            <div className="container text-center pt-5 ">
                <h1>Welcome to Examinator</h1>
                    <Fragment>
                        <p>Choose your subject and start exam</p>
                        <div className="row justify-content-center">
                            {subjectRange.map((sbj, index) =>
                                <SubjectItemButton
                                    key={index}
                                    image={sbj.img}
                                    path={sbj.path}
                                />
                            )}
                        </div>
                    </Fragment>

            </div>

        </Fragment>
    )

}

export default Home;