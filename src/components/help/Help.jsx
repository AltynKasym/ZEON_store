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

function Help() {
  const [image, setImage] = useState([]);
  const storage = getStorage();

  const listImage = () => {
    listAll(sRef(storage, "help/"))
      .then((res) => {
        res.items.forEach((itemref) => {
          getDownloadURL(itemref)
            .then((url) => {
              setImage((image) => [...image, url]);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    listImage();
  }, []);

  const [data, setData] = useState({});
  const database = getDatabase(app);

  useEffect(() => {
    get(child(ref(database), `help/`))
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

  return (
    <div className="help">
      <div className="container">
        <div className="help__inner">
          <div className="help__inner-media">
            {image.map((item, id) => (
              <img key="item+id" src={item} alt="Помощь" />
            ))}
          </div>
          <div className="help__inner-info">
            <h2 className="help__inner-title">Помощь</h2>
            {Object.keys(data).map((id, index) => {
              return (
                <Accordion className="help__inner-accordion" key={id + index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="help__inner-accordion-title">
                      {data[id].question}
                    </Typography>
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
