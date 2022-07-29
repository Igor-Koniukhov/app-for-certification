import React, {Fragment} from "react";

import "./Home.module.css";
import ChemistryImage from "../img/subject/IUPAC-feature-image.png";
import PhysicImage from "../img/subject/physic.png";
import SociologyImage from "../img/subject/sociology.png";
import MicroBiologyImage from "../img/subject/microbiology.png"
import SubjectItemButton from "../components/UI/SubjectItemButton";

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

    return (
        <Fragment>
            <div className="container text-center pt-5 ">
                <h1>Welcome to Examinator</h1>
                <p>Choose your subject and start exam</p>
                <small>At that moment, working only on chemistry exams. On click start initialization of the Contract
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
            </div>

        </Fragment>
    )

}

export default Home;