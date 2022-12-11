import { useState } from "react";
import { XCircleFill, Book } from "react-bootstrap-icons";

function FeaturedBook(props) {

    const [featuredBookInfo, setFeaturedBookInfo] = useState(false);

    let onReadingList = false;
    

    for (let i=0; i<props.readingList.length; i++) {
        if (props.readingList[i].bookID === props.featuredBookData?.[0].gut_id) {
            onReadingList = true; 
        } else {
            onReadingList = false;
        }
    }

    function toggleFeaturedBookInfo() {
        setFeaturedBookInfo(!featuredBookInfo);
    }

    if(props.featuredBookData?.[0].title){
        if(props.featuredBookData){

            return ( 
                <>
                    <div className="container vp-background pt-2">
                        <div className="row text-center">
                            <div className="col-md-1"></div>
                            <div className="col col-md-10">
                                <h1 className="vp-featured-text">Featured Book</h1>
                            </div>
                            <div className="col-md-1"></div>
                        </div>
                    </div>
                    <div className="container vh-25">
                        <div className="row">    
                            <div className="col-md-1"></div>              
                            {/* <div className="card mb-3 col-12 col-md-8"> */}
                            <div className="card mb-3 col col-md-10 vp-card">
                                <div className="row">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-3">
                                                <img src={props.featuredBookData?.[0].cover_url} alt="Book Cover"></img>
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
                                                            <span> On your reading list! </span>
                                                            <Book />
                                                        </h2>
                                                        <button className="btn m-1 vp-button"
                                                            id="removeReadingListToastBtn"
                                                            onClick={() => {
                                                                let tempReadingList = [...props.readingList];

                                                                for (let i=0; i<tempReadingList.length; i++) {
                                                                    if (tempReadingList[i].bookID === props.featuredBookData?.[0].gut_id) {
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
                                                                let tempReadingList = [
                                                                    ...props.readingList, {
                                                                      bookID: props.featuredBookData?.[0].gut_id,
                                                                      isActive: true,
                                                                      updated: Date.now(),
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
                                                        props.setEtextId(props.featuredBookData?.[0].gut_id);
                                                        props.setBookData([]);
                                                        props.setBookData(props.featuredBookData);
                                                        props.setView("EPub2")}}
                                                >
                                                    Read Now
                                                </button>
                                                <button type="button" className="btn w-100 m-1 vp-button"
                                                    onClick={() => {
                                                        props.setAudioBookId(props.featuredBookData?.[0].gut_id);
                                                        props.setBookData([]);
                                                        props.setBookData(props.featuredBookData)
                                                        props.setView("audio");
                                                    }}
                                                >Listen Now</button>
                                                <button type="button" className="btn w-100 m-1 vp-button" onClick={() => toggleFeaturedBookInfo()}>Info</button>
                                            </div>
                                            <div className="col-md-1"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {featuredBookInfo && (
                        <div className="modal vp-background">
                        <div onClick={toggleFeaturedBookInfo} className="overlay"></div>
                        <div className="modal-content vp-background">
                            <h2 className="vp-featured-text">{props.featuredBookData?.[0].title}</h2>
                            <div className="vp-body-text" dangerouslySetInnerHTML={{__html: props.featuredBookData?.[0].description}}></div>
                            <p>
                            <button type="button" className="btn w-100 m-1 vp-button" 
                                onClick={() => {
                                    props.setEtextId(props.featuredBookData?.[0].gut_id);
                                    props.setBookData([]);
                                    props.setBookData(props.featuredBookData);
                                    props.setView("EPub2")}}
                            >
                                Read Now
                            </button>
                            <button type="button" className="btn w-100 m-1 vp-button"
                                onClick={() => {
                                    props.setAudioBookId(props.featuredBookData?.[0].gut_id);
                                    props.setView("audio");
                                }}
                            >Listen Now</button>
                            </p>
                            <h2 className="close-modal vp-svg" onClick={toggleFeaturedBookInfo}>
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