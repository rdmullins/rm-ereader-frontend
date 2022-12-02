// Imports go Here
import React, { useState, useEffect } from "react";
// import { ReactDOM } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "./Header";
import Search from "./Search";
import FeaturedBook from "./FeaturedBook";
import BookCard from "./BookCard";
import Collections from "./Collections";
import Categories from "./Categories";
import Footer from "./Footer";
import MyBooks from "./MyBooks"
import SearchView from "./SearchView";
import EPub from "./EPub";
import EPub2 from "./EPub2";
import "./App.css";


function App() {
    console.log("Started App")
    const [featuredBookData, setFeaturedBookData] = useState([]);
    const [bookData, setBookData] = useState([]);
    const [view, setView] = useState("home");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("Title");
    const [darkMode, setDarkMode] = useState(false);
    const [searchEndpoint, setSearchEndpoint] = useState("");

     // Pull a random book for the featured box on the front page

    let bookId = Math.floor((Math.random()*5)+1)

    useEffect(() => {
      let endpoint = `https://8000-rdmullins-rmereaderback-gvtdimo6rdt.ws-us77.gitpod.io/books/author_book/${bookId}/`
      axios.get(endpoint)
        .then((response)=> setFeaturedBookData(response.data))
    },[]);

    // TEST Pulls All Books for Search Screen

    useEffect(() => {
      if (searchEndpoint !== "") {
        let endpoint = searchEndpoint
        axios.get(endpoint)
          .then((response)=> setBookData(response.data))
      }
    },[searchEndpoint]);

    //};

    // localStorage.setItem("featuredBook", featuredBookData);
    
    // featuredBookDisplay = featuredBookData;

    // Pull a random featured book for the front page

    //setFeaturedBookData(JSON.parse(localStorage.getItem("featuredBook")));

    console.log(featuredBookData);
    console.log("BOOKDATA FROM APP LEVEL:", bookData);
    
    //     //console.log("Inside App function.");
    //     //const [post] = React.useState(null);
        
  
    //     if (portfolioData.length === 0) return (
    //       <div className="spinner-border text-primary text-center" role="status">
    //         <span className="visually-hidden">Loading...</span>
    //       </div>
    //       );
        
    //     console.log(portfolioData);

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
                setSearchEndpoint = {setSearchEndpoint}/>
              <hr></hr>
              <FeaturedBook
                featuredBookData = {featuredBookData}
                setView = {setView} />
              {/* <>
                {featuredBookDisplay}
              </> */}
              {/* <BookCard 
                featuredBookData = {featuredBookData} /> */}
              <Collections />
              <Categories />
              <hr></hr>
              <Footer 
                setView = {setView} 
                darkMode = {darkMode}
                setDarkMode = {setDarkMode}/>
              <button onClick={() => setView(EPub2)}>EPub Reader Demo</button>
            </>
            }

            {(view === "myBooks") &&
            <>
              <Header 
                setView = {setView}
                darkMode = {darkMode} />
              <MyBooks />
              <hr></hr>
              <Footer 
                setView = {setView}
                darkMode = {darkMode}
                setDarkMode = {setDarkMode}/>
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
                setSearchEndpoint = {setSearchEndpoint}/>
              <hr></hr>
              <SearchView 
                searchType = {searchType} 
                searchTerm = {searchTerm}
                bookData = {bookData} />
              <hr></hr>
              <Footer 
                setView = {setView}
                darkMode = {darkMode}
                setDarkMode = {setDarkMode}/>
            </>
            }

            {(view === "EPub") && 
            <>
              <Header setView = {setView}
              darkMode = {darkMode} />
              <EPub 
                featuredBookData = {featuredBookData}
                bookData = {bookData}/>
              <Footer 
                setView = {setView}
                darkMode = {darkMode}
                setDarkMode = {setDarkMode}/>
            </>
            }

            {(view === "EPub2") &&
            <>
              <Header setView = {setView}
                darkMode = {darkMode} />
              <EPub2 />
              <Footer
                setView = {setView}
                darkMode = {darkMode}
                setDarkMode = {setDarkMode} />
            </>
            }

          </div>
        );
      
  };      
export default App;