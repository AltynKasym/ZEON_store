import React, { useState, useEffect } from "react";
import { getDatabase, child, get, ref, set } from "firebase/database";
import { app } from "../Database";
import "./aboutUs.scss";
import { db } from "../db";

function AboutUs() {
    const database = getDatabase(app);
    const [data, setData] = useState({});

    useEffect(() => {
        setData(db.about_us);
    }, []);

    return (
        <div className="about-us">
            <div className="container">
                <div className="about-us__inner">
                    <div className="about-us__media">
                        {Object.keys(data).map((id, index) => {
                            return data[id].img.map((item, name) => (
                                <img src={item} alt={name} key={item + name} />
                            ));
                        })}
                    </div>
                    <div className="about-us__info">
                        {Object.keys(data).map((id, index) => {
                            return (
                                <div key={id + index}>
                                    <h1 className="about-us__info-title">
                                        {data[id].title}
                                    </h1>
                                    <p className="about-us__info-text">
                                        {data[id].text}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
