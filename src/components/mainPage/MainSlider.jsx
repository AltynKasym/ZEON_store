import React, { useState, useEffect } from "react";
import "./mainPage.scss";
import { app } from "../Database";
import { getDatabase, ref, child, get } from "firebase/database";
import Carousel from "nuka-carousel";
import { Link } from "react-router-dom";
import { db } from "../db";

function MainSlider() {
    const [data, setData] = useState({});
    const database = getDatabase(app);

    useEffect(() => {
        setData(db.mainSlider);
    }, []);

    return (
        <div className="mainSlider">
            <Carousel
                wrapAround={true}
                autoplay={true}
                autoplayInterval={3000}
                slidesToShow={1}
                defaultControlsConfig={{
                    nextButtonStyle: {
                        display: "none",
                    },
                    prevButtonStyle: {
                        display: "none",
                    },
                    // pagingDotsStyle: {
                    //   fill: "#fff",
                    //   border: "1px solid gray",
                    //   borderRadius: "100%",
                    //   width: "2px",
                    //   height: "5px",
                    //   margin: "3px",
                    // },
                    // pagingDotsClassName: "mainSlider__pagingDots",
                }}
            >
                {Object.keys(data).map((id, index) => {
                    return (
                        <Link
                            to={data[id].sliderLink ? data[id].sliderLink : "#"}
                        >
                            <img
                                className="productComponent__card-photo"
                                src={data[id].sliderImg}
                                alt={data[id].sliderId}
                                key={id + index}
                            />
                        </Link>
                    );
                })}
            </Carousel>
        </div>
    );
}

export default MainSlider;
