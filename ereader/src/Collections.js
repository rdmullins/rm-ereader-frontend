import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function Collections(props) {

    let listedCollections = [];
    let coverList = [];
    let coverScroll = {};


    // if(collections?.[0].name){
    //     if(collections){

    //         console.log("Collections Back: ", collections);

    //         let collectionList = collections?.map(coll => {
    //             <li>{coll.name}</li>
    //         })
    //     };
    // };

    function buildCollectionsList() {

        let publicCollections = props.collectionsList.filter(allCollections => 
            allCollections.is_public === true);

        listedCollections = publicCollections.map(coll => (
            <li key={coll.id}>{coll.name}</li>
        ))
    }

    function MakeCoverList() {
        for (let i=1; i<2; i++) {
            coverList.push("./logo192.png");
        }
    };

    buildCollectionsList();

    MakeCoverList();

    coverScroll = coverList.map(cover => 
        <div key={cover} className="col">
            <img src={cover} className="image-fluid border collection-cover"></img>
            <p>
                <a href="#">Read</a> | <a href="#">Listen</a><br/><a href="#">Details</a>
            </p>
        </div>
    );

    return (
        <>
            <div className="container">
            <div className="row">
                <div className="col-12 col-md-8 d-inline-block p-2 vh-25">
                    <div className="row text-center g-0 border">
                        <div className="d-inline-block p-2 overflow-auto vh-25">{coverScroll}</div>
                    </div>
                </div>
                
                <div className="col-12 col-md-4 d-inline-block vh-25 p-2">

                    <div>
                        <h4>Collections</h4>
                        <ul>
                            {listedCollections}
                        </ul>
                    </div>
                    
                </div>
            </div>
            </div>
        </>
    );
};

export default Collections;
