import { useState } from "react";
import { XCircleFill, Book } from "react-bootstrap-icons";

function FeaturedBook(props) {

    //props.setBookData([]);

    const [featuredBookInfo, setFeaturedBookInfo] = useState(false);

    let onReadingList = false;
    

    for (let i=0; i<props.readingList.length; i++) {
        if (props.readingList[i].bookID === props.featuredBookData?.[0].gut_id) {
            onReadingList = true; 
        } else {
            onReadingList = false;
        }
    }

    

    // if (props.readingList.contains("bookID", (props.featuredBookData?.[0].gut_id))) {
    //     console.log("Book found!");
    // } else {
    //     console.log("Book not found. props.readingList.contains(bookid, ", props.featuredBookData?.[0].gut_id, ") was false.");
    // }

    function toggleFeaturedBookInfo() {
        setFeaturedBookInfo(!featuredBookInfo);
    }

    if(props.featuredBookData?.[0].title){
        if(props.featuredBookData){

            // let copyOfAudioBookData = { ...props.audioBookData };

            // copyOfAudioBookData = {
            //     audioBookTitle: props.featuredBookData.book[0].title,
            //     audioBookAuthor: 
            //         `${props.featuredBookData?.author[0].first_name} &nbsp ${props.featuredBookData?.author[0].last_name} &nbsp (${props.featuredBookData?.author[0].dob}-${props.featuredBookData?.author[0].dod})`,
            //     audioBookFile: "ereader/src/audiobooks/frankenstein_00_shelley_64kb.mp3",
            //     audioBookCoverImage: "https://www.gutenberg.org/cache/epub/84/pg84.cover.medium.jpg"
            // };

            // props.setAudioBookData(copyOfAudioBookData);

            return ( 
                <>
                    <div className="container">
                        <div className="row text-center">
                            <div className="col">
                                <h2>Featured Book</h2>
                            </div>
                        </div>
                    </div>
                    <div className="container vh-25">
                        <div className="row">                  
                            {/* <div className="card mb-3 col-12 col-md-8"> */}
                            <div className="card mb-3 col-12">
                                <div className="row">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-3">
                                                <img src={`https://www.gutenberg.org/cache/epub/${props.featuredBookData?.[0].gut_id}/pg${props.featuredBookData?.[0].gut_id}.cover.medium.jpg`} className="img-fluid border" alt="Book Cover"></img>
                                            </div>
                                            <div className="col-6">
                                                <h4><em>{props.featuredBookData?.[0].title}</em></h4>
                                                <p>
                                                    <strong>
                                                        {props.featuredBookData?.[0].authors[0].first_name} &nbsp;
                                                        {props.featuredBookData?.[0].authors[0].last_name} &nbsp;
                                                    </strong>
                                                        {/* , {props.featuredBookData?.author_role[0].role} */}
                                                    (
                                                        {props.featuredBookData?.[0].authors[0].dob}
                                                        -
                                                        {props.featuredBookData?.[0].authors[0].dod}
                                                    )                                                       
                                                </p>

                                                {(onReadingList) && 
                                                    <>
                                                        <hr/>
                                                        <h2>
                                                            <Book /> 
                                                            <span> On your reading list!</span>
                                                        </h2>
                                                        <button className="btn m-1 btn-info"
                                                            onClick={() => {
                                                                console.log("Remove Button Clicked.");
                                                                let tempReadingList = [...props.readingList];

                                                                for (let i=0; i<tempReadingList.length; i++) {
                                                                    if (tempReadingList[i].bookID === props.featuredBookData?.[0].gut_id) {
                                                                        tempReadingList[i].isActive = false; 
                                                                    }
                                                                };
                                                                props.setReadingList(tempReadingList);
                                                                localStorage.setItem("readingList", JSON.stringify(tempReadingList));  
                                                                console.log("State version of reading list: ", props.readingList);
                                                                console.log("LocalStorage version: ", localStorage.getItem("readingList"));                                                           
                                                            }}
                                                        >Remove From Reading List</button>
                                                    </>
                                                }

                                                {(!onReadingList) && 
                                                    <>
                                                        <hr/>
                                            
                                                        <button className="btn m-1 btn-info"
                                                            onClick={() => {
                                                                console.log("Add Button Clicked.");
                                                                let dateUpdated = Date.now();
                                                                let tempReadingList = [
                                                                    ...props.readingList, {
                                                                      bookID: props.featuredBookData?.[0].gut_id,
                                                                      isActive: true,
                                                                      updated: dateUpdated
                                                                    }
                                                                  ];
                                                                props.setReadingList(tempReadingList);
                                                                localStorage.setItem("readingList", JSON.stringify(tempReadingList));  
                                                                console.log("State version of reading list: ", props.readingList);
                                                                console.log("LocalStorage version: ", localStorage.getItem("readingList"));                                                              
                                                            }}
                                                        >Add To Reading List</button>
                                                    </>
                                                }

                                            </div>
                                            <div className="col-3">
                                                <button type="button" className="btn w-100 m-1 btn-info" 
                                                    onClick={() => {
                                                        props.setEtextId(props.featuredBookData?.[0].gut_id);
                                                        props.setBookData([]);
                                                        props.setBookData(props.featuredBookData);
                                                        props.setView("EPub2")}}
                                                >
                                                    Read Now
                                                </button>
                                                <button type="button" className="btn w-100 m-1 btn-info"
                                                    onClick={() => {
                                                        props.setAudioBookId(props.featuredBookData?.[0].gut_id);
                                                        props.setView("audio");
                                                    }}
                                                >Listen Now</button>
                                                <button type="button" className="btn w-100 m-1 btn-info" onClick={() => toggleFeaturedBookInfo()}>Info</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-12 col-md-4 p-2 overflow-auto">
                                <h3>{props.featuredBookData?.book[0].title}</h3> 
                                <p>{props.featuredBookData?.book[0].description}</p>
                            </div> */}
                        </div>
                    </div>

                    {featuredBookInfo && (
                        <div className="modal">
                        <div onClick={toggleFeaturedBookInfo} className="overlay"></div>
                        <div className="modal-content">
                            <h2>{props.featuredBookData?.[0].title}</h2>
                            <div dangerouslySetInnerHTML={{__html: props.featuredBookData?.[0].description}}></div>
                            <p>
                                <button type="button" className="btn w-100 m-1 btn-info" 
                                    onClick={() => {
                                        props.setEtextId(props.featuredBookData?.[0].gut_id);
                                        props.setView("EPub2")}}
                                >Read Now
                                </button>
                                <button type="button" className="btn w-100 m-1 btn-info">Listen Now</button>
                            </p>
                            <h2 className="close-modal" onClick={toggleFeaturedBookInfo}>
                                <XCircleFill></XCircleFill>
                            </h2>
                        </div>
                        </div>
                    )}
                </>
            )
        } else {
            return (
                <>
                 <h2>Loading...</h2>
                </>
                 
            )
        }
        
    };
}

export default FeaturedBook