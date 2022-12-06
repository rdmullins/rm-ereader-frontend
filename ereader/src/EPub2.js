import React, { useRef, useState, useEffect } from "react";
//import "./styles.css";
import { ReactReader, ReactReaderStyle } from "react-reader";
import { getStorage, ref, getBlob, getDownloadURL } from "firebase/storage";
//import Ebook from "./epub/sample.epub";

const ownStyles = {
  ...ReactReaderStyle,
  arrow: {
    ...ReactReaderStyle.arrow,
    color: "red"
  }
};

//const loc = "epubcfi(/6/4[chapter1]!/4/2[chapter1]/8[s3]/6/1:490)";
const loc = null;

export default function EPub2() {

  const [ePubURL, setEPubURL] = useState("");

  const storage = getStorage();
  const ePubRef = ref(storage, 'https://firebasestorage.googleapis.com/v0/b/rm-ereader.appspot.com/o/pg76.epub?alt=media&token=494468c0-2142-4022-8a03-d3bb83779d0e');

  // const epub = getBlob(storage, ePubRef);

  // console.log(epub);

  // let ePubURL = "";

  // getDownloadURL(storage, ePubRef) {
  //   .then((url) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.responseType = "blob";
  //     xhr.onload = (event) => {
  //       const blob = xhr.response;
  //     };
  //     xhr.open("GET", url);
  //     xhr.send();
  //   });
  // }

  const [selections, setSelections] = useState([]);
  const renditionRef = useRef(null);

  const [location, setLocation] = useState(loc);
  const locationChanged = (epubcifi) => {
    // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    setLocation(epubcifi);
    console.log(location);
  };

  // setSelections([
  //   {
  //     text:
  //       "In previous generations, people often believed that business transactions were immo",
  //     cfiRange: "epubcfi(/6/4[chapter1]!/4/2[chapter1]/4[s1]/6,/1:0,/1:83)"
  //   }
  // ]);

  useEffect(() => {
    if (renditionRef.current) {
      function setRenderSelection(cfiRange, contents) {
        setSelections(
          selections.concat({
            text: renditionRef.current.getRange(cfiRange).toString(),
            cfiRange
          })
        );
        renditionRef.current.annotations.add(
          "highlight",
          cfiRange,
          {},
          null,
          "hl",
          {
            fill: "yellow",
            "fill-opacity": "0.5"
          }
        );
        contents.window.getSelection().removeAllRanges();
      }
      renditionRef.current.on("selected", setRenderSelection);
      return () => {
        renditionRef.current.off("selected", setRenderSelection);
      };
    }
  }, [setSelections, selections]);


  getDownloadURL(ePubRef)
    .then((url) => {
     (setEPubURL(url));
    })
    .catch((error) => {})
  
  return (
    <>
      <div className="container" style={{ position: "relative", height: "100vh" }}>
        <ReactReader
          location={location}
          locationChanged={locationChanged}
          //url={"https://gerhardsletten.github.io/react-reader/files/alice.epub"}
          //url = {"https://drive.google.com/uc?id=1bR-kxc_m4boe69fYKVGtLPhiD-ElAiG4/view?usp=sharing"}

          url={ePubURL}
          styles={ownStyles}
          getRendition={(rendition) => {
            renditionRef.current = rendition;
            renditionRef.current.themes.default({
              "::selection": {
                background: "yellow"
              }
            });
            setSelections([]);
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
          zIndex: 1,
          backgroundColor: "white"
        }}
      >
        Selection:
        <ul>
          {selections.map(({ text, cfiRange }, i) => (
            <li key={i}>
              {text}{" "}
              <button
                onClick={() => {
                  renditionRef.current.annotations.add(
                    "highlight",
                    "epubcfi(/6/8[chapter_001]!/4/2/12,/1:0,/1:44)",
                    {},
                    null,
                    "hl",
                    {
                      fill: "yellow",
                      "fill-opacity": "0.5"
                    }
                  );
                  console.log(cfiRange);
                  renditionRef.current.display(cfiRange);
                }}
              >
                Show
              </button>
              <button
                onClick={() => {
                  renditionRef.current.annotations.remove(
                    cfiRange,
                    "highlight"
                  );
                  setSelections(selections.filter((item, j) => j !== i));
                }}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}