import React, { useState, useEffect, useContext } from "react";
import { ProductComponent } from "../Components";
import { getDatabase, child, get, ref } from "firebase/database";
import { app } from "../Database";
import "./bestseller.scss";
import { Context } from "../context";
import { db } from "../db";

function Bestseller({ data }) {
    return (
        <div className="bestseller">
            <div className="bestseller__inner">
                {Object.keys(data).map((id, ind) => {
                    if (id > 0 && id <= 8) {
                        return data[id].collectionProducts.map(
                            (item, index) => {
                                console.log("index", item);
                                if (item.bestseller) {
                                    return (
                                        <div className="bestseller__product">
                                            <ProductComponent
                                                data={
                                                    data[id].collectionProducts
                                                }
                                                id={index}
                                                collectionId={
                                                    data[id].collectionId
                                                }
                                                key={item + index}
                                            />
                                        </div>
                                    );
                                }
                            }
                        );
                    }
                })}
            </div>
        </div>
    );
}

export default Bestseller;
