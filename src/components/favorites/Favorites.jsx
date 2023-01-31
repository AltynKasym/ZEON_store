import React, { useState, useEffect, useContext } from "react";
import { Collection, NewProduct, ProductComponent } from "../Components";
import Context from "../context";
import { getDatabase, child, get, ref } from "firebase/database";
import { app } from "../Database";
import "./favorites.scss";
import Carousel from "nuka-carousel";
import { Link } from "react-router-dom";
import { containerClasses, Pagination, Typography } from "@mui/material";
import { db } from "../db";

function Favorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites"));

    const [data, setData] = useState({});

    useEffect(() => {
        setData(db.collection);
    }, [favorites]);

    let [step, setStep] = useState(4);

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler);
        return function () {
            document.removeEventListener("scroll", scrollHandler);
        };
    }, [step]);

    const scrollHandler = (e) => {
        if (
            e.target.documentElement.scrollHeight -
                (e.target.documentElement.scrollTop + window.innerHeight) <
            100
        ) {
            console.log("step+8");
            setStep(step + 8);
        }
    };

    return (
        <div className="favorites">
            <div className="container">
                <h3 className="favorites__card-title">Избранное</h3>
                <p className="favorites__card-amount">
                    Товаров в избранном: <span>{favorites.length}</span>
                </p>
                <div className="favorites__inner">
                    <div className="favorites__products">
                        {Object.keys(data).map((id, ind) => {
                            return favorites.map((item, indexx) => {
                                if (id == item.split(",")[0] - 1) {
                                    return data[id].collectionProducts.map(
                                        (itemm, index) => {
                                            if (
                                                itemm.productId ==
                                                item.split(",")[1]
                                            ) {
                                                console.log(index);
                                                return (
                                                    <ProductComponent
                                                        data={
                                                            data[id]
                                                                .collectionProducts
                                                        }
                                                        id={index}
                                                        collectionId={
                                                            data[id]
                                                                .collectionId
                                                        }
                                                        key={item + index}
                                                    />
                                                );
                                            }
                                        }
                                    );
                                }
                            });
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Favorites;
