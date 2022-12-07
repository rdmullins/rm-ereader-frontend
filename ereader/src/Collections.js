import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { getStorage, ref, getBlob, getDownloadURL } from "firebase/storage";
import {XCircleFill} from "react-bootstrap-icons";

function Collections(props) {

    let listedCollections = [];
    let coverList = [];
    let filteredCollection = [];
    let coverScroll = {};

    const [bookInfo, setBookInfo] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalDesc, setModalDesc] = useState("");

    function toggleBookInfo() {
        setBookInfo(!bookInfo);
    }



    function buildCollectionsList() {

        let publicCollections = props.collectionsList.filter(allCollections => 
            allCollections.is_public === true);

        listedCollections = publicCollections.map(coll => (
            <li key={coll.id} onClick={()=> {
                console.log(`You clicked on ${coll.name}!`);
                props.setCollectionFilter(`${coll.name}`);
            }}>
            
            <a className="dropdown-item" href="#">{coll.name}</a>
            </li>))
        
    }


                



    // function MakeCoverList() {
    //     coverlist = props.collectionsReturned.map(book => 
            
    //         )
    //     }
    // };

    buildCollectionsList();

    function getCoverURLs(gutenberg_id) {
        const storage = getStorage();
        const coverRef = ref(storage, `gs://rm-ereader.appspot.com/pg${gutenberg_id}.cover.medium.jpg`);
        console.log("Inside the getURLs function. Id is ", gutenberg_id);
        return(`The URL is gonna be awesome`);
    }


    // MakeCoverList();

    coverScroll = props.collectionsReturned.map(cover => 
        <li className="list-group-item p-1 m-2 border">
        <div key={cover.id} className="col">
            <img src={()=>getCoverURLs(cover.gut_id)} className="image-fluid border collection-cover" alt={cover.title}></img>
            <p>
                <a href="#"  
                    onClick={() => {
                        props.setEtextId(cover.gut_id);
                        props.setView("EPub2")}}
                    >Read Now
                </a> | <a href="#">Listen</a><br/><a href="#" onClick={() => {setModalTitle(cover.title); setModalDesc(cover.description); toggleBookInfo();}}>Details</a>
            </p>
        </div>
        </li>
    );

    // Make Filtered Book List

    filteredCollection = props.collectionsReturned.map(book =>
        <li>{book.title}</li>
        )

    return (
        <>
            <div className="container">
            <div className="row">
                <div className="col-12 col-md-10 d-inline-block p-2 vh-25">
                    <div className="row text-center g-0 border">
                        {/* <div className="d-inline-block p-2 overflow-auto vh-25 list-group-horizontal">{coverScroll}</div> */}
                        <ul className="list-group p-1">
                            {coverScroll}
                        </ul>
                    </div>
                </div>
                
                <div className="col-12 col-md-2 d-inline-block vh-25 p-2">
                    <form>
                    <div className="dropdown">
                        <button className="btn btn-lg w-100 btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Collections    
                        </button>
                        <ul className="dropdown-menu">
                            {listedCollections}
                        </ul>
                    </div>
                    </form>
                        
                </div>
            </div>
            </div>

            {bookInfo && (
                <div className="modal">
                <div onClick={toggleBookInfo} className="overlay"></div>
                <div className="modal-content">
                    <h2>{modalTitle}</h2>
                    <div dangerouslySetInnerHTML={{__html: modalDesc}}></div>
                    <p>
                        <button type="button" className="btn w-100 m-1 btn-info" 
                            onClick={() => {
                                props.setEtextId(props.featuredBookData?.[0].gut_id);
                                props.setView("EPub2");
                            }}
                        >Read Now
                        </button>
                        <button type="button" className="btn w-100 m-1 btn-info"
                            onClick={() => {
                                props.setAudioBookId(props.featuredBookData?.[0].gut_id);
                                props.setView("audio");
                            }}
                        >Listen Now</button>
                    </p>
                    <h2 className="close-modal" onClick={toggleBookInfo}>
                        <XCircleFill></XCircleFill>
                    </h2>
                </div>
                </div>
            )}
        </>
    );
};

export default Collections;
