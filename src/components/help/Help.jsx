import React, { useState, useEffect } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./help.scss";
import { app } from "../Database";
import { getDatabase, ref, child, get, set } from "firebase/database";
import {
    getStorage,
    ref as sRef,
    getDownloadURL,
    list,
    listAll,
} from "firebase/storage";
import { db } from "../db";
import helpPhoto from "../img/help/help.png";

function Help() {
    const [image, setImage] = useState([]);
    const storage = getStorage();

    const [data, setData] = useState({});
    const database = getDatabase(app);

    useEffect(() => {
        setData(db.help);
    }, []);

    return (
        <div className="help">
            <div className="container">
                <div className="help__inner">
                    <div className="help__inner-media">
                        <img src={helpPhoto} alt="Помощь" />
                    </div>
                    <div className="help__inner-info">
                        <h2 className="help__inner-title">Помощь</h2>
                        {Object.keys(data).map((id, index) => {
                            return (
                                <Accordion
                                    id="help__inner-accordion"
                                    key={id + index}
                                >
                                    <AccordionSummary
                                        style={{ margin: "0" }}
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography id="help__inner-accordion-title">
                                            {data[id].question}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography id="help__inner-accordion-text">
                                            {data[id].answer}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Help;
