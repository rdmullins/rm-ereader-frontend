// Imports go Here
import React, { useState, useEffect } from "react";
import { ReactDOM } from "react";
//import { Modal } from "react-modal";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "./Header";
import Search from "./Search";
import BookCard from "./BookCard";
import Collections from "./Collections";
import Categories from "./Categories";
import Footer from "./Footer";
import MyBooks from "./MyBooks"
import SearchView from "./SearchView";
//import Modal from "./Modal";
//import Splash from "./Splash";
//import PortfolioCards from "./PortfolioCards";
//import "./App.css";
import "./App.css";
//import Navbar from "./Navbar";
//import Footer from "./Footer";


//Modal.setAppElement('App');

function App() {
    console.log("Started App")

    const [view, setView] = useState("home");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("title");

    // const [portfolioData, setPortfolioData] = useState([]);
    // const [page, setPage] = useState("landing");
    // //console.log(menuData);
    
    // useEffect(() => {
    //   let endpoint = "https://8000-rdmullins-rmportfolioba-k4rg5x1d2lk.ws-us77.gitpod.io/api/projects/"
    //   axios.get(endpoint)
    //     .then((response)=> setPortfolioData(response.data))
    // },[]);
    
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
                setView = {setView} />
              <Search 
                searchTerm = {searchTerm} 
                setSearchTerm = {setSearchTerm} 
                searchType = {searchType} 
                setSearchType = {setSearchType}
                setView = {setView}/>
              <BookCard />
              <Collections />
              <Categories />
              <Footer 
                setView = {setView} />
            </>
            }

            {(view === "myBooks") &&
            <>
              <Header 
                setView = {setView} />
              <MyBooks />
              <Footer 
                setView = {setView} />
            </>
            }

            {(view === "search") && 
            <>
              <Header setView = {setView} />
              <Search 
                searchTerm = {searchTerm} 
                setSearchTerm = {setSearchTerm} 
                searchType = {searchType} 
                setSearchType = {setSearchType}
                setView = {setView}/>
              <SearchView 
                searchType = {searchType} 
                searchTerm = {searchTerm} />
              <BookCard />
              <Footer 
                setView = {setView} />
            </>
            }

          </div>
        );
      
          };      
      export default App;