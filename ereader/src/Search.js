import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function Search(props) {

    

    // function handleClick(e) {
    //     console.log("Search button clicked.");
    //     console.log(e);
    // }


    let endpoint = "";

    function handleFormSubmit(e) {

        // console.log("Form submitted.");
        // console.log("Search Term: ", props.searchTerm);
        // console.log("Type of Search:");
        if (e.target[2].checked) {
            //console.log("Title");
            props.setSearchType("Title");
            endpoint = `https://8000-rdmullins-rmereaderback-gvtdimo6rdt.ws-us78.gitpod.io/books/booksearch/?search=${props.searchTerm}`
            props.setSearchEndpoint(endpoint);

        }
        if (e.target[3].checked) {
            //console.log("Author");
            props.setSearchType("Author");
            endpoint = `https://8000-rdmullins-rmereaderback-gvtdimo6rdt.ws-us78.gitpod.io/books/authorsearch/?search=${props.searchTerm}`
            props.setSearchEndpoint(endpoint);
        }
        if (e.target[4].checked) {
            //console.log("Subject");
            props.setSearchType("Subject");
            endpoint = `https://8000-rdmullins-rmereaderback-gvtdimo6rdt.ws-us78.gitpod.io/books/subjectsearch/?search=${props.searchTerm}`
            props.setSearchEndpoint(endpoint);
        }

        //props.setSearchTerm("");
        props.setView("search");

    }

    return (
        <div className="container p-1 pt-4 vp-background vp-body-text">
            <form onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit(e, props.searchTerm)
            }}>
            <div className="row">
                <div className="col-1"></div>
                <div className="col-10 input-group mb-3">
                    <input 
                        type="text" 
                        onInput={(event) => 
                            props.setSearchTerm(event.target.value)} 
                        value={props.searchTerm} 
                        className="form-control" 
                        placeholder="Search..." 
                        aria-label="Search Box" 
                        aria-describedby="searchButton">
                    </input>
                    <button 
                        className="btn vp-button" 
                        type="submit" 
                        id="searchButton">
                            Search
                    </button>
                </div>
                <div className="col-1"></div>
            </div>
            <div className="row text-center">
                <div className="col">
                <ul className="list-group list-group-horizontal">
                    <li className="col-4 list-group-item border-0 bg-transparent">
                        <input 
                            className="form-check-input me-1" 
                            type="radio" 
                            name="searchGroup" 
                            value="" 
                            id="title" 
                            defaultChecked={true}>
                        </input>
                        <label 
                            className="form-check-label" 
                            htmlFor="title">
                                Title
                        </label>
                    </li>
                    <li className="col-4 list-group-item border-0 bg-transparent">
                        <input 
                            className="form-check-input me-1" 
                            type="radio" 
                            name="searchGroup" 
                            value="" 
                            id="author">
                        </input>
                        <label 
                            className="form-check-label" 
                            htmlFor="author">
                                Author
                        </label>
                    </li>
                    <li className="col-4 list-group-item border-0 bg-transparent">
                        <input 
                            className="form-check-input me-1" 
                            type="radio" 
                            name="searchGroup" 
                            value="" 
                            id="subject">
                        </input>
                        <label 
                            className="form-check-label" 
                            htmlFor="subject">
                                Subject
                        </label>
                    </li>
                </ul>
                </div>
            </div>
            </form>
        </div>
    )
};

export default Search;