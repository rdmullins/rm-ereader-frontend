import { useState } from "react";
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
                props.setCollectionFilter(`${coll.name}`);
            }}>
            
            <a className="dropdown-item" href="#" key={coll.name}>{coll.name}</a>
            </li>))
    }

    buildCollectionsList();

    // Make Cover List

    coverScroll = props.collectionsReturned.map(cover => 

        <div className="col-3">
            <div className="card vp-card text-center h-100" key={cover.id}>
                <img src={cover.cover_url} className="mx-auto mt-3 img-fluid vp-book-cover" alt="Book Cover"/>
            <div className="card-body">
                <h5 className="card-title vp-featured-text">{cover.title}</h5>
                <p className="card-text vp-body-text"> 
                <a href="#"  
                    onClick={() => {
                        props.setEtextId(cover.gut_id);
                        props.setView("EPub2")}}
                    >Read Now
                </a> 
                <br/> 
                <a href="#" onClick={()=> {
                    props.setAudioBookId(cover.gut_id);
                    props.setView("audio");
                }}
                    >Listen</a>
                <br/>
                <a href="#" onClick={() => {
                    setModalTitle(cover.title); 
                    setModalDesc(cover.description); 
                    props.setBookData([]);
                    props.setBookData(cover);
                    toggleBookInfo();
                }}
                    >Details</a>
            </p>
            </div>
            <div className="card-footer">
                {props.collectionFilter}
            </div>
                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
            </div>
            </div>
    );



    // Make Filtered Book List

    filteredCollection = props.collectionsReturned.map(book =>
        <li key={book.id}>{book.title}</li>
        )

    return (
        <>
            <div className="container pt-2">
            <div className="row">
            <div className="col d-inline-block p-2">
                <form>
                <div className="dropdown">
                    <button className="btn btn-lg w-100 vp-button dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Collections    
                    </button>
                    <ul className="dropdown-menu">
                        {listedCollections}
                    </ul>
                </div>
                </form>
            </div>
            </div>

            <div className="row">
                <div className="col d-inline-block p-2 vh-25">
                    <div className="row text-center g-0 border">
                        <div className="scrolling-wrapper card-group p-1 flex-nowrap overflow-scroll">
                            {coverScroll}
                        </div>
                    </div>
                </div>
            </div>
            </div>

            {bookInfo && (
                <div className="modal">
                <div onClick={toggleBookInfo} className="overlay"></div>
                <div className="modal-content vp-background">
                    <h2 className="vp-featured-text">{modalTitle}</h2>
                    <div className="vp-body-text" dangerouslySetInnerHTML={{__html: modalDesc}}></div>
                    <p>
                        <button type="button" className="btn w-100 m-1 vp-button" 
                            onClick={() => {
                                // props.setEtextId(book.gut_id);
                                props.setEtextId(props.bookData.gut_id);
                                props.setView("EPub2");
                            }}
                        >Read Now
                        </button>
                        <button type="button" className="btn w-100 m-1 vp-button"
                            onClick={() => {
                                // props.setAudioBookId(book.gut_id);
                                props.setAudioBookId(props.bookData.gut_id);
                                props.setView("audio");
                            }}
                        >Listen Now</button>
                    </p>
                    <h2 className="close-modal vp-svg" onClick={toggleBookInfo}>
                        <XCircleFill></XCircleFill>
                    </h2>
                </div>
                </div>
            )}
        </>
    );
};

export default Collections;
