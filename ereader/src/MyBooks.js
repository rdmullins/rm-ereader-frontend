import { XCircleFill } from "react-bootstrap-icons";
import { useState } from "react";


function MyBooks(props) {

    const [myBookModal, setMyBookModal] = useState(false);
    const [myBookModalTitle, setMyBookModalTitle] = useState("");
    const [myBookModalDesc, setMyBookModalDesc] = useState("");
    const [myBookModalBookID, setMyBookModalBookID] = useState(0);
    
    function toggleMyBookModal() {
        setMyBookModal(!myBookModal);
    }

    // let APIBookResults = [];

    // async function searchMyBooks(rlist) {
    //     console.log("Inside async function. Searching for ", rlist);
    //     props.setMyBookSearch(`https://8000-rdmullins-rmereaderback-gvtdimo6rdt.ws-us78.gitpod.io/books/bookbyid/?search=${rlist}`);
        
    // }

    // console.log("Inside myBooks - props.bookData is ", props.bookData);
    // console.log("Main reading list is ", props.readingList);

    let myActiveReadingList = props.readingList.filter(book =>
        book.isActive === true);

    console.log("My Active Reading List: ", myActiveReadingList);

    // console.log("My Active Reading List is: ", myActiveReadingList);
    let myReadingList = [];
    //let myReadingList = myActiveReadingList.map(book => 
    for (let i=0; i<myActiveReadingList.length; i++) 
    {   myReadingList.push(
        <>
        <tr key={myActiveReadingList[i].bookID}>
            <td onClick={()=> {
                setMyBookModalTitle(myActiveReadingList[i].title);
                setMyBookModalBookID(myActiveReadingList[i].bookID);
                toggleMyBookModal();
                // props.setMyBookSearch(`https://8000-rdmullins-rmereaderback-gvtdimo6rdt.ws-us78.gitpod.io/books/bookbyid/?search=${myActiveReadingList[i].bookID}`);
                // console.log(props.bookData?.title);
                // toggleMyBookModal();
                }}>
                <strong>{myActiveReadingList[i].title}, </strong>{myActiveReadingList[i].author}
            </td>
        </tr>
        </>
    )
    };

    console.log("MyReadingList: ", myReadingList);
        
    // console.log("Final filtered reading list ids: ", myReadingList);



    // for (let i=0; i<myReadingList.length; i++) {
    //     searchMyBooks(myReadingList[i]);
    //     let returnedBook = props.bookData;
    //     APIBookResults.push(returnedBook);
    // }

    
    //https://8000-rdmullins-rmereaderback-gvtdimo6rdt.ws-us78.gitpod.io/

    // if (APIBookResults?.length <1) {
    //     return (
    //         <>
    //             <div className="vp-body-text">Loading...</div>
    //         </>
    //     )
    // }

    // if (APIBookResults?.length>=1) {
    //     console.log("API Book Results: ", APIBookResults);

    return (
        <>
            <div className="container-fluid d-flex h-100 flex-column vp-body">
                <div className="row text-center d-flex flex-grow-1">
                    <div className="col vp-flex-fill">
                        <h1 className="vp-featured-text">My Books</h1>
                        <table className = "table table-hover table-striped overflow-auto h-auto vp-body-text">
                            <tbody>
                                {myReadingList}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {myBookModal &&
            
            <>
                <div className="modal vp-background">
                    <div onClick={toggleMyBookModal} className="overlay"></div>
                    <div className="modal-content vp-background">
                        <h2 className="vp-featured-text">{myBookModalTitle}</h2>
                        
                        <p>
                        <button type="button" className="btn w-100 m-1 vp-button" 
                            onClick={() => {
                                props.setEtextId(myBookModalBookID);
                                // props.setBookData([]);
                                // props.setBookData(props.bookData);
                                props.setView("EPub2")}}
                        >
                            Read Now
                        </button>
                        <button type="button" className="btn w-100 m-1 vp-button"
                            onClick={() => {
                                props.setAudioBookId(myBookModalBookID);
                                props.setView("audio");
                            }}
                        >Listen Now</button>
                        <button type="button" className="btn w-100 m-1 vp-button"
                            onClick={() => {
                                let tempReadingList = [...props.readingList];

                                for (let i=0; i<tempReadingList.length; i++) {
                                    if (tempReadingList[i].bookID === myBookModalBookID) {
                                        tempReadingList[i].isActive = false; 
                                    }
                                };
                                props.setReadingList(tempReadingList);
                                localStorage.setItem("readingList", JSON.stringify(tempReadingList));  
                            }}
                        >Remove From Reading List</button>


                        </p>
                        <h2 className="close-modal vp-svg" onClick={toggleMyBookModal}>
                            <XCircleFill></XCircleFill>
                        </h2>
                    </div>
                </div>
            </>
            
            }
        </>
    )
    
};

export default MyBooks;