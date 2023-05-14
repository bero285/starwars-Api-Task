import React, { useEffect, useState, useRef } from "react";
import InfoCard from "./InfoCard.js";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import Card from "./Card";
import "./App.css";
function App() {
  const [indexPage, setIndexPage] = useState(1);
  const [pageNum, setPageNum] = useState(1);
  const [info, setInfo] = useState([]);
  const [newInfo, setNewInfo] = useState([]);
  const [newcont, setNewCont] = useState(true);
  const [newApi, setNewApi] = useState();
  const [content, setContent] = useState();
  const [filt, setFilt] = useState(false);
  const [filInfo, setFilInfo] = useState();

  const params = useParams();

  const changeCont = () => {
    console.log("sss");

    setNewApi();
  };
  const showCard = (event) => {
    setNewCont(false);
  };

  useEffect(() => {
    const url = newApi;

    async function getNewText(data) {
      let z = await fetch(data);
      let p = await z.json();

      setContent(p);
    }

    getNewText(url);
  }, [newApi, newcont]);

  useEffect(() => {
    const url = "https://swapi.dev/api/people/?page=" + params.id + "";

    async function getText(data) {
      let x = await fetch(data);
      let y = await x.json();

      setInfo((prevVal) => {
        return [y.results];
      });
    }

    getText(url);

    for (var i = 1; i < 10; i++) {
      const urll = "https://swapi.dev/api/people/?page=" + i + "";

      async function getTextNew(data) {
        let x = await fetch(data);
        let y = await x.json();

        if (y) {
          setNewInfo((prevVal) => {
            return [...prevVal, y.results];
          });
        }
      }
      getTextNew(urll);
    }
  }, [params.id]);

  useEffect(() => {
    const url = "https://swapi.dev/api/people/?page=" + params.id + "";

    async function getText(data) {
      let x = await fetch(data);
      let y = await x.json();

      setInfo((prevVal) => {
        return [y.results];
      });
    }

    getText(url);
  }, [indexPage]);

  useEffect(() => {
    setPageNum(parseInt(params.id));
  }, []);
  function changePage(event) {
    setContent("");
    setIndexPage(event.target.innerText);
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  }
  function changePageDIf(event) {
    setContent("");
    setIndexPage(event.target.innerText);
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    if (pageNum < 8) {
      setPageNum(pageNum + 1);
    }
  }
  function pageNumRise() {
    setPageNum(pageNum + 1);
  }
  function pageNumDec() {
    setPageNum(pageNum - 1);
  }
  function filterFunc(event) {
    if (event.target.value === "") {
      setNewCont(true);
      setFilt(false);
    }

    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < newInfo[i].length; j++) {
        if (
          event.target.value.toLowerCase().replace(/\s/g, "") ===
          newInfo[i][j].name.toLowerCase().replace(/\s/g, "")
        ) {
          setFilt(true);
          setFilInfo(newInfo[i][j]);
          setNewCont(false);
        }
      }
    }
  }

  return (
    <div className="container">
      {newcont || filt ? (
        <input
          className="searchEngine"
          placeholder="Enter Full Name"
          onChange={filterFunc}
        />
      ) : null}

      {filt ? (
        <Card
          changeCont={changeCont}
          value={filInfo.url}
          showCard={showCard}
          see="see more"
          url={filInfo.url}
          key={filInfo.name}
          name={filInfo.name}
          gender={filInfo.gender}
          birthDate={filInfo.birth_year}
        />
      ) : null}

      {newcont && filt !== true
        ? info.map((data) => {
            return data.map((information, index) => {
              return (
                <Card
                  showCard={showCard}
                  see="see more"
                  value={information.url}
                  url={information.url}
                  key={index}
                  name={information.name}
                  gender={information.gender}
                  birthDate={information.birth_year}
                />
              );
            });
          })
        : null}

      {newcont ? (
        <ul className="pagetion">
          {pageNum > 1 ? (
            <li className="move" onClick={pageNumDec}>
              Back
            </li>
          ) : null}
          <Link
            onClick={changePage}
            to={{
              pathname: `/home/${pageNum}`,
            }}
          >
            <li>{pageNum}</li>
          </Link>
          {pageNum !== 9 ? (
            <Link
              onClick={changePageDIf}
              to={{
                pathname: `/home/${pageNum + 1}`,
              }}
            >
              {" "}
              <li>{pageNum + 1}</li>
            </Link>
          ) : null}
          {pageNum < 8 ? (
            <li className="move" onClick={pageNumRise}>
              Next
            </li>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
}

export default App;
