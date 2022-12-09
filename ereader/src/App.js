// Imports go Here
import React, { useState, useEffect } from "react";
import {FirebaseError, initializeApp} from 'firebase/app';
//import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs} from 'firebase/firestore/lite';
// import { ReactDOM } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import APIBaseURL from "./BaseURL";
import axios from "axios";
import Header from "./Header";
import Search from "./Search";
import FeaturedBook from "./FeaturedBook";
import BookCard from "./BookCard";
import Collections from "./Collections";
import CollectionsAccordion from "./CollectionsAccordion";
import CollectionsDatalist from "./CollectionsDatalist";
import Categories from "./Categories";
import Footer from "./Footer";
import MyBooks from "./MyBooks"
import SearchView from "./SearchView";
import EPub from "./EPub";
import EPub2 from "./EPub2";
import TestRSS from "./TestRSS";
import Audio from "./Audio";
import Notes from "./Notes";
import Cover from "./Cover";
import "./App.css";
import { GlobeCentralSouthAsia } from "react-bootstrap-icons";
//import { getStorage, getRef, getDownloadUrl } from Firebase.storage


function App() {
    console.log("Started App");

    initializeApp("Firebase.js");
    

    const [featuredBookData, setFeaturedBookData] = useState(["Initial State"]);
    const [bookData, setBookData] = useState([]);
    const [view, setView] = useState("home");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("Title");
    const [darkMode, setDarkMode] = useState(false);
    const [searchEndpoint, setSearchEndpoint] = useState("");
    const [searchResultEndpoint, setSearchResultEndpoint] = useState(""); 
    const [searchResultBook, setSearchResultBook] = useState([]);
    const [etextId, setEtextId] = useState(0);
    const [collectionsList, setCollectionsList] = useState([]);
    const [collectionBooks, setCollectionBooks] = useState([]);
    const [collectionFilter, setCollectionFilter] = useState([]);
    const [collectionsReturned, setCollectionsReturned] = useState([]);
    const [audioBookId, setAudioBookId] = useState(0);
    const [audioBookURL, setAudioBookURL] = useState(null)
    const [myBookSearch, setMyBookSearch] = useState("");


    const [audioBookData, setAudioBookData] = useState( {
      audioBookTitle: "",
      audioBookAuthor: "",
      audioBookFile: "",
      audioBookCoverImage: ""
    });

    // Check localStorage for Reading List; if not found, CREATE

    if (localStorage.getItem("readingList") === null) {
      localStorage.setItem("readingList", JSON.stringify([
        {
          bookID: 0,
          isActive: false,
          updated: 0
        }
      ]))
    };

    // READ readingList from localStorage into state

    const [readingList, setReadingList] = useState(JSON.parse(localStorage.getItem(("readingList"))));

    function populateLocalStorage() {
      let dateUpdated = Date.now();

      let updatedReadingList = [
        ...readingList, {
          bookID: 84,
          isActive: true,
          updated: dateUpdated
        }
      ];

      setReadingList(updatedReadingList);

      localStorage.setItem("readingList", JSON.stringify(updatedReadingList));
    }

    // function handleDemoClick() {
    //   setView("EPub2");
    // }

    // function handleRSSClick() {
    //   setView("RSS");
    // }

    // Pulls random book to feature on the main page

    let bookId = Math.floor((Math.random()*5))
    // console.log("Random book ID = ", bookId);

    console.log("ReadingList = ", readingList);

    useEffect(() => {
      let endpoint = `https://8000-rdmullins-rmereaderback-gvtdimo6rdt.ws-us78.gitpod.io/books/bookbyid/?search=${bookId}`
      axios.get(endpoint)
      .then((response)=> setFeaturedBookData(response.data))
    },[]);


    // console.log("Featured Book: ", featuredBookData);

    // Builds the URL for Search API Call

    useEffect(() => {
      axios.get(searchResultEndpoint)
      .then((response)=> setSearchResultBook(response.data))
      // .then(console.log("Search result endpoint change detected. Inside App UseEffect for search results - book ID is", searchResultBook))
      // .then(console.log("The search URL was ", searchResultEndpoint));
//    },[]);
    },[searchResultEndpoint]);


    // Search API Call - Pulls All Books for Search Screen if Blank

    useEffect(() => {
      if (searchEndpoint !== "") {
        let endpoint = searchEndpoint
        axios.get(endpoint)
          .then((response)=> setBookData(response.data))
          // .then(console.log("Search Endpoint change detected."))
          .then(setSearchResultEndpoint(`https://8000-rdmullins-rmereaderback-gvtdimo6rdt.ws-us78.gitpod.io/books/author_book/${bookData.bookId}/`))
      }
//    },[]);
    },[searchEndpoint]);

    useEffect(() => {
      console.log("Inside myBook useEffect. Search endpoint is ", myBookSearch);
      if (myBookSearch !== "") {
        let endpoint = myBookSearch
        axios.get(endpoint)
          .then((response)=> setBookData(response.data))
          // .then(console.log("Search Endpoint change detected."))
          //.then(setMyBookSearch(`https://8000-rdmullins-rmereaderback-gvtdimo6rdt.ws-us78.gitpod.io/books/bookbyid/?search=${bookData.bookId}/`))
      }
//    },[]);
    },[myBookSearch]);

    useEffect(() => {
        let endpoint = `https://8000-rdmullins-rmereaderback-gvtdimo6rdt.ws-us78.gitpod.io/books/collections/`
        axios.get(endpoint)
        .then((response)=> {
          setCollectionsList(response.data)
          return response.data
        })
        // .then((collectionsList) => console.log("Collections: ", collectionsList))
    },[]);
    
    useEffect(() => {
      let endpoint = `https://8000-rdmullins-rmereaderback-gvtdimo6rdt.ws-us78.gitpod.io/books/collectionsearch/?search=${collectionFilter}`
      console.log("Collection search filter is ", collectionFilter);
      axios.get(endpoint)
      .then((response)=> {
        setCollectionsReturned(response.data)
        console.log("Collections Returned: ", collectionsReturned);
        return response.data
      })
      // .then((collectionsList) => console.log("Collections: ", collectionsList))
  },[collectionFilter]);


        return (

          <div className="container">

            {(view === "home") &&
            <>
              <Header 
                setView = {setView}
                darkMode = {darkMode} />
              <Search 
                searchTerm = {searchTerm} 
                setSearchTerm = {setSearchTerm} 
                searchType = {searchType} 
                setSearchType = {setSearchType}
                setView = {setView}
                searchEndpoint = {searchEndpoint}
                setSearchEndpoint = {setSearchEndpoint}
                setSearchResultEndpoint = {setSearchResultEndpoint}
                setSearchResultBook = {setSearchResultBook}
                etextId = {etextId}
                setEtextId = {setEtextId}
                readingList = {readingList}
                setReadingList = {setReadingList} />
              <hr></hr>
              <FeaturedBook
                featuredBookData = {featuredBookData}
                setBookData = {setBookData}
                setView = {setView} 
                setAudioBookData = {setAudioBookData}
                audioBookData = {audioBookData} 
                etextId = {etextId}
                setEtextId = {setEtextId} 
                audioBookId = {audioBookId}
                setAudioBookId = {setAudioBookId}
                audioBookURL = {audioBookURL}
                setAudioBookURL = {setAudioBookURL}
                readingList = {readingList}
                setReadingList = {setReadingList} />
              <Collections
                collectionBook = {collectionBooks}
                setCollectionBooks = {setCollectionBooks}
                collectionsList = {collectionsList}
                setCollectionsList = {setCollectionsList} 
                collectionFilter = {collectionFilter}
                setCollectionFilter = {setCollectionFilter}
                collectionsReturned = {collectionsReturned}
                setCollectionsReturned = {setCollectionsReturned}
                setView = {setView} 
                setEtextId = {setEtextId} 
                audioBookId = {audioBookId}
                setAudioBookId = {setAudioBookId} 
                audioBookURL = {audioBookURL}
                setAudioBookURL = {setAudioBookURL}
                readingList = {readingList}
                setReadingList = {setReadingList} />
              <Categories 
                setView = {setView} 
                audioBookId = {audioBookId}
                setAudioBookId = {setAudioBookId}
                readingList = {readingList}
                setReadingList = {setReadingList} />
              <hr></hr>
              <Footer 
                setView = {setView} 
                darkMode = {darkMode}
                setDarkMode = {setDarkMode}
                readingList = {readingList}
                setReadingList = {setReadingList} />
              {/* <button onClick={() => handleDemoClick()}>EPub Reader Demo</button> */}
              {/* <button onClick={() => handleRSSClick()}>RSS Reader Demo</button> */}
            </>
            }

            {(view === "myBooks") &&
            <>
              <Header 
                setView = {setView}
                darkMode = {darkMode} />
              <MyBooks 
                readingList = {readingList}
                setReadingList = {setReadingList}
                bookData = {bookData}
                searchResultBook = {searchResultBook}
                setSearchResultBook = {setSearchResultBook}
                searchEndpoint = {searchEndpoint}
                setSearchEndpoint = {setSearchEndpoint} 
                myBookSearch = {myBookSearch}
                setMyBookSearch = {setMyBookSearch} />
              <hr></hr>
              <Footer 
                setView = {setView}
                darkMode = {darkMode}
                setDarkMode = {setDarkMode}
                readingList = {readingList}
                setReadingList = {setReadingList}/>
            </>
            }

            {(view === "search") && 
            <>
              <Header setView = {setView}
              darkMode = {darkMode} />
              <Search 
                searchTerm = {searchTerm} 
                setSearchTerm = {setSearchTerm} 
                searchType = {searchType} 
                setSearchType = {setSearchType}
                setView = {setView}
                searchEndpoint = {searchEndpoint}
                setSearchEndpoint = {setSearchEndpoint}
                setSearchResultEndpoint = {setSearchResultEndpoint}
                setSearchResultBook = {setSearchResultBook} 
                etextId = {etextId}
                setEtextId = {setEtextId}
                audioBookId = {audioBookId}
                setAudioBookId = {setAudioBookId}
                audioBookURL = {audioBookURL}
                setAudioBookURL = {setAudioBookURL} 
                readingList = {readingList}
                setReadingList = {setReadingList}/>
              <hr></hr>
              <SearchView 
                searchType = {searchType} 
                setView = {setView}
                searchTerm = {searchTerm}
                bookData = {bookData}
                searchResultBook = {searchResultBook} 
                etextId = {etextId}
                setEtextId = {setEtextId}
                audioBookId = {audioBookId}
                setAudioBookId = {setAudioBookId}
                audioBookURL = {audioBookURL}
                setAudioBookURL = {setAudioBookURL}
                readingList = {readingList}
                setReadingList = {setReadingList} />
              <hr></hr>
              <Footer 
                setView = {setView}
                darkMode = {darkMode}
                setDarkMode = {setDarkMode}
                readingList = {readingList}
                setReadingList = {setReadingList}/>
            </>
            }

            {(view === "EPub2") &&
            <>
              <Header setView = {setView}
                darkMode = {darkMode} />
              <Notes 
                bookData = {bookData} />
              <EPub2 
                etextId = {etextId} 
                readingList = {readingList}
                setReadingList = {setReadingList}/>
              <Footer
                setView = {setView}
                darkMode = {darkMode}
                setDarkMode = {setDarkMode}
                readingList = {readingList}
                setReadingList = {setReadingList} />
            </>
            }

            {(view === "RSS") &&
            <>
              <Header setview = {setView}
                darkMode = {darkMode} />
              <TestRSS />
              <Footer
                setView = {setView}
                darkMode = {darkMode}
                setDarkMode = {setDarkMode}
                readingList = {readingList}
                setReadingList = {setReadingList} />
            </>
            }

            {(view === "audio") &&
            <>
              <Header
                setView = {setView}
                darkMode = {darkMode} />
              <Audio 
                audioBookId = {audioBookId}
                audioBookURL = {audioBookURL}
                setAudioBookURL = {setAudioBookURL}
                readingList = {readingList}
                setReadingList = {setReadingList} />
              <Footer
                setView = {setView}
                darkMode = {darkMode}
                setDarkMode = {setDarkMode} 
                readingList = {readingList}
                setReadingList = {setReadingList}/>
            </>
            }

            {(view === "Fiction") &&
            <>
              <Header
                setView = {setView}
                darkMode = {darkMode} />
              <h1>Fiction</h1>
              <Footer
                setView = {setView}
                darkMode = {darkMode}
                setDarkMode = {setDarkMode}
                readingList = {readingList}
                setReadingList = {setReadingList} />
            </>
            }

            {(view === "Non-Fiction") &&
            <>
              <Header
                setView = {setView}
                darkMode = {darkMode} />
              <h1>Non-Fiction</h1>
              <Footer
                setView = {setView}
                darkMode = {darkMode}
                setDarkMode = {setDarkMode}
                readingList = {readingList}
                setReadingList = {setReadingList} />
            </>
            }

            {(view === "Poetry") &&
            <>
              <Header
                setView = {setView}
                darkMode = {darkMode} />
              <h1>Poetry</h1>
              <Footer
                setView = {setView}
                darkMode = {darkMode}
                setDarkMode = {setDarkMode}
                readingList = {readingList}
                setReadingList = {setReadingList} />
            </>
            }

            {(view === "Short Stories") &&
            <>
              <Header
                setView = {setView}
                darkMode = {darkMode} />
              <h1>Short Stories</h1>
              <Footer
                setView = {setView}
                darkMode = {darkMode}
                setDarkMode = {setDarkMode} 
                readingList = {readingList}
                setReadingList = {setReadingList}/>
            </>
            }

            {(view === "Classical") &&
            <>
              <Header
                setView = {setView}
                darkMode = {darkMode} />
              <h1>Classical</h1>
              <Footer
                setView = {setView}
                darkMode = {darkMode}
                setDarkMode = {setDarkMode}
                readingList = {readingList}
                setReadingList = {setReadingList} />
            </>
            }

            {(view === "Drama") &&
            <>
              <Header
                setView = {setView}
                darkMode = {darkMode} />
              <h1>Drama</h1>
              <Footer
                setView = {setView}
                darkMode = {darkMode}
                setDarkMode = {setDarkMode}
                readingList = {readingList}
                setReadingList = {setReadingList} />
            </>
            }
<button onClick={() => populateLocalStorage()}>Populate LocalStorage</button>
          </div>
          
        );
      
  }; 
       
export default App;