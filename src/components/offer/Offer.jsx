import React, { useState, useEffect } from "react";
import { app } from "../Database";
import { getDatabase, child, get, ref, set } from "firebase/database";
import "./offer.scss";
import { db } from "../db";

function Offer() {
    const database = getDatabase(app);
    const [data, setData] = useState({});

    useEffect(() => {
        setData(db.offer);
    }, []);

    return (
        <div className="offer">
            <div className="container">
                <h1 className="offer__title">Публичная офферта</h1>

                {Object.keys(data).map((id, index) => {
                    return (
                        <div
                            className="offer__text"
                            key={id + index}
                            dangerouslySetInnerHTML={{
                                __html: `${data[id].offerText}`,
                            }}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
}

export default Offer;
