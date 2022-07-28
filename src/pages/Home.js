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
            <div className="container text-center pt-5">
                <div className="row">
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