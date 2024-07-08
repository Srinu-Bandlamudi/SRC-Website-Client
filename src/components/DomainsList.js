import React, { useEffect, useState } from "react";
import app from "../assets/images/ui-ux.avif";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Domains() {
  // init of variables

  // useEffect for getting domains

  useEffect(() => {
    getDomains();
  }, []);

  // Init of variables

  const getDomainsApi = process.env.REACT_APP_GET_DOMAINS;

  // init React hooks

  const [domains, setDomains] = useState(null);

  // Function for getting domains

  const getDomains = async () => {
    try {
      const res = await axios.get(getDomainsApi);
      console.log(res.data);
      setDomains(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  // Functions for cursor movement

  // Function for horizantal scroll of domains

  const move = (e) => {
    const container = document.getElementById("scroll");
    container.scrollLeft += e.deltaY;
  };

  // Function for enable scroll on background

  const enableScroll = () => {
    document.removeEventListener("wheel", preventDefault, false);
  };

  // Function for disable scroll

  const disableScroll = () => {
    document.addEventListener("wheel", preventDefault, {
      passive: false,
    });
  };

  // Function for prevent default

  const preventDefault = (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.returnValue = false;
  };

  return (
    <>
      <div className="domain-container">
        <div
          className="domain-head"
          style={{
            fontSize: "1.9rem",
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Domains
        </div>
        <div
          id="scroll"
          onWheel={move}
          onMouseEnter={disableScroll}
          onMouseLeave={enableScroll}
        >
          {domains &&
            domains.map((ele) => {
              return (
                <Link
                  to={`Domain/${ele.name}`}
                  onClick={enableScroll}
                  key={ele._id}
                >
                  <div className="domain-element">
                    <div className="domain-image">
                      <img src={app} alt="Domain" />
                    </div>
                    <div className="domain-name">
                      <h3>{ele.name}</h3>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
}
