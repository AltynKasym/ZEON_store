import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { default as help } from "../img/help/help.png";
import "./help.scss";
import { app } from "../Database";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Help() {
  const [data, setData] = useState({});
  const database = getDatabase(app);

  useEffect(() => {
    get(child(ref(database), `help`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData({ ...snapshot.val() });
        } else {
          setData({});
        }
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

  // Запись в firebase

  // function writeData(userId, question, answer) {
  //   const db = getDatabase();
  //   set(ref(db, "help/" + userId), {
  //     question: question,
  //     answer: answer,
  //   });
  // }

  // writeData(
  //   "6",
  //   "Как я могу оставить заявку на обратную связь?",
  //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet laoreet a, neque, gravida urna libero iaculis lacus. Pellentesque pellentesque massa ornare sit pellentesque elit nulla. Id est tellus maecenas ornare velit. Ut cras ut rhoncus fermentum pharetra a sit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet laoreet a, neque, gravida urna libero iaculis lacus. Pellentesque pellentesque massa ornare sit pellentesque elit nulla. Id est tellus maecenas ornare velit. "
  // );

  return (
    <div className="help">
      <div className="container">
        <div className="help__inner">
          <div className="help__inner-media">
            <img src={help} alt="Помощь" />
          </div>
          <div className="help__inner-info">
            {Object.keys(data).map((id, index) => {
              return (
                <Accordion className="help__inner-accordion" key={id + index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className="help__inner-accordion-title"
                  >
                    <Typography>{data[id].question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails className="help__inner-accordion-text">
                    <Typography>{data[id].answer}</Typography>
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
