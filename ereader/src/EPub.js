import { useRef } from 'react'
import {
  EpubViewer,
  ReactEpubViewer
} from 'react-epub-viewer'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

function EPub(props) {

    const viewerRef=useRef(null);

    const [bookMeta, setBookMeta] = useState([]);

    // let etext_id = props.featuredBookData?.book[0].gut_id;
    // console.log("Inside Epub, featured book id is ", etext_id);

    useEffect(() => {
        let endpoint = `https://8000-rdmullins-rmereaderback-gvtdimo6rdt.ws-us77.gitpod.io/books/bookmetadatalookup/84`
        console.log("Inside ePub, endpoint is ", endpoint);
        console.log("eTextId is ", props.eTextId);
        axios.get(endpoint)
          .then((response)=> setBookMeta(response.data))
      },[]);

    console.log("Inside Epub, bookmeta is ", bookMeta);

    if (!bookMeta && bookMeta.length < 1) {
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        ) 
    }

    // const eReaderView = bookMeta.map(book => (
    //     <>
    //         <div className="container">
    //             <div className="row">
    //                 <div className="col">
    //                     <ReactEpubViewer
    //                         url={book.epub}
    //                         ref={viewerRef}
    //                     />
    //                 </div>
    //             </div>
    //         </div>
    //     </>
    // ))

    return (
      //   <div style={{ position: "relative", height: "100%" }}>
      //   <ReactEpubViewer 
      //     url={"/home/roger/Downloads/pg76-images-3.epub"}
      //     ref={viewerRef}
      //   />
      // </div>
        <>
            <div className="container border overflow-auto">
                <div className="row">
                    <div className="col">
                        <pre>
                            <div dangerouslySetInnerHTML={{__html: bookMeta?.fulltext}}></div>
                        </pre>
                    </div>
                </div>
            </div>
        </>
    )
    
};

export default EPub;