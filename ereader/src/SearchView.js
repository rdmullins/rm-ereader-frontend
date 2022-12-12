import { useState } from "react";
import { XCircleFill, Book } from "react-bootstrap-icons";

function SearchView(props) {

    const { bookData = [] } = props;
    const [bookInfo, setBookInfo] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalDesc, setModalDesc] = useState("");
    const [modalID, setModalID] = useState(0);

    function toggleBookInfo() {
        setBookInfo(!bookInfo);
    }



    if (!bookData && bookData.length < 1) {
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        ) 
    }

    let onReadingList = false;

    const searchList = bookData.map(book => (
     
        <>
        <div className="container vp-body-text" key={book.id}>
            <div className="row">
                <div className="card mb-3 col-12 vp-card">
                    <div className="row">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-3">
                                    <img src={`https://www.gutenberg.org/cache/epub/${book.gut_id}/pg${book.gut_id}.cover.medium.jpg`} alt="Book Cover" className="img-fluid border"></img>
                                </div>
                                <div className="col-6">
                                    <h5><em>{book.title}</em></h5>
                                    <p>
                                        <strong>
                                            {book.authors && book.authors[0].first_name} &nbsp;
                                            {book.authors && book.authors[0].last_name} &nbsp;   
                                        </strong>
                                            
                                        (
                                            {book.authors && book.authors[0].dob}
                                            -
                                            {book.authors && book.authors[0].dod}
                                        )
                                    </p>

                                    {(onReadingList) && 
                                        <>
                                            <hr/>
                                            <h2>
                                                <Book /> 
                                                <span> On your reading list!</span>
                                            </h2>
                                            <button className="btn m-1 vp-button"
                                                onClick={() => {
                                                    let tempReadingList = [...props.readingList];

                                                    for (let i=0; i<tempReadingList.length; i++) {
                                                        if (tempReadingList[i].bookID === book.gut_id) {
                                                            tempReadingList[i].isActive = false; 
                                                        }
                                                    };
                                                    props.setReadingList(tempReadingList);
                                                    localStorage.setItem("readingList", JSON.stringify(tempReadingList));  
                                                }}
                                            >Remove From Reading List</button>
                                        </>
                                    }

                                    {(!onReadingList) && 
                                        <>
                                            <hr/>
                                
                                            <button className="btn m-1 vp-button"
                                                onClick={() => {
                                                    let dateUpdated = Date.now();
                                                    let tempReadingList = [
                                                        ...props.readingList, {
                                                            bookID: book.gut_id,
                                                            isActive: true,
                                                            updated: dateUpdated
                                                        }
                                                        ];
                                                    props.setReadingList(tempReadingList);
                                                    localStorage.setItem("readingList", JSON.stringify(tempReadingList));  
                                                }}
                                            >Add To Reading List</button>
                                        </>
                                    }

                                </div>
                                <div className="col-3">
                                    <button type="button" className="btn w-100 m-1 vp-button" 
                                        onClick={() => {
                                            props.setEtextId(book.gut_id);
                                            props.setView("EPub2")}}
                                        >Read Now
                                    </button>
                                    <button type="button" className="btn w-100 m-1 vp-button"
                                        onClick={() => {
                                            props.setAudioBookId(book.gut_id);
                                            props.setView("audio");
                                        }}
                                    >Listen Now</button>
                                    <button type="button" className="btn w-100 m-1 vp-button" onClick={() => 
                                        {
                                        setModalTitle(book.title);
                                        setModalDesc(book.description);
                                        setModalID(book.gut_id);
                                        toggleBookInfo();
                                        }}>Info
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    ))

    return (
        <>
        <div className="container vp-background">
            <div className="row text-center">
                <h2 className="vp-featured-text">Search Results</h2>
            </div>
            <div className="row">
                {searchList}
            </div> 

        {bookInfo && (
            <div className="modal">
            <div onClick={toggleBookInfo} className="overlay"></div>
            <div className="modal-content">
                <h2 className="vp-featured-text">{modalTitle}</h2>
                <div className="vp-body-text" dangerouslySetInnerHTML={{__html: modalDesc}}></div>
                <p>
                <button type="button" className="btn w-100 m-1 vp-button" 
                    onClick={() => {
                        props.setEtextId(modalID);
                        props.setView("EPub2")}}
                >
                    Read Now
                </button>
                <button type="button" className="btn w-100 m-1 vp-button"
                    onClick={() => {
                        props.setAudioBookId(modalID);
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
            </div>
        </>
    )

};

export default SearchView;