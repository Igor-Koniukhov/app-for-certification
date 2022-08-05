import React from "react";
import './IntroContent.module.css';


const IntroContent = () => {
    return (

        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active ">
                    <div className="certificate-blank-black">
                    </div>
                </div>
                <div className="carousel-item ">
                    <div className="certificate-blank">
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="certificate-blank-black">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IntroContent;

