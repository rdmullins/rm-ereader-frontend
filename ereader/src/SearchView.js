import { useState } from "react";
import { XCircleFill } from "react-bootstrap-icons";

function SearchView(props) {

    const { bookData = [] } = props;
    const [bookInfo, setBookInfo] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalDesc, setModalDesc] = useState("");

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

    console.log("Book Data in Search View:", bookData);

    const searchList = bookData.map(book => (
        <>
        <div className="container">
            <div className="row">
                <div className="card mb-3 col-12">
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
                                            {/* {book.author_role && book.author_role[0].role} */}
                                        (
                                            {book.authors && book.authors[0].dob}
                                            -
                                            {book.authors && book.authors[0].dod}
                                        )
                                    </p>
                                </div>
                                <div className="col-3">
                                    <button type="button" className="btn w-100 m-1 btn-info" onClick={() => 
                                        {    
                                        props.setEtextId(book.gut_id);
                                        props.setView("EPub");}}>
                                                Read Now
                                    </button>
                                    <button type="button" className="btn w-100 m-1 btn-info">Listen Now</button>
                                    <button type="button" className="btn w-100 m-1 btn-info" onClick={() => 
                                        {
                                        setModalTitle(book.title);
                                        setModalDesc(book.description);
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

    // if(bookData){
    //     console.log("Inside first SearchView conditional.")
    //     console.log("props.bookData = ", bookData);
    //     if(bookData?.book){
    //         console.log("Inside second SearchView conditional.")
    //         console.log("props.bookData = ", bookData);
    return (
        <>
        <div>
            <h2>Search Results</h2>
            {searchList}
        </div> 

        {bookInfo && (
            <div className="modal">
            <div onClick={toggleBookInfo} className="overlay"></div>
            <div className="modal-content">
                <h2>{modalTitle}</h2>
                <div dangerouslySetInnerHTML={{__html: modalDesc}}></div>
                <p>
                    <button type="button" className="btn w-100 m-1 btn-info">Read Now</button>
                    <button type="button" className="btn w-100 m-1 btn-info">Listen Now</button>
                </p>
                <h2 className="close-modal" onClick={toggleBookInfo}>
                    <XCircleFill></XCircleFill>
                </h2>
            </div>
            </div>
        )}

        </>
    )
    //     } else {
    //         {console.log("Inside SearchView else")}
  
    //     };
    // };
};

export default SearchView;