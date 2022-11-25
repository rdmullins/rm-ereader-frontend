// Imports go Here
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
//import Splash from "./Splash";
//import PortfolioCards from "./PortfolioCards";
//import "./App.css";
//import "./App.css";
//import Navbar from "./Navbar";
//import Footer from "./Footer";

function App() {
    console.log("Started App")

    const [portfolioData, setPortfolioData] = useState([]);
    const [page, setPage] = useState("landing");
    //console.log(menuData);
    
    useEffect(() => {
      let endpoint = "https://8000-rdmullins-rmportfolioba-k4rg5x1d2lk.ws-us77.gitpod.io/api/projects/"
      axios.get(endpoint)
        .then((response)=> setPortfolioData(response.data))
    },[]);
    
        //console.log("Inside App function.");
        //const [post] = React.useState(null);
        
  
        if (portfolioData.length === 0) return (
          <div className="spinner-border text-primary text-center" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          );
        
        console.log(portfolioData);
    
        return (
          <div className="container">
            {(page === "landing") && <Splash pageUpdater={setPage} />}
            {(page === "portfolio") && <PortfolioCards pageUpdater={setPage} portfolioData={portfolioData} />}
            {/* /*{(page > 0 && page != 8) && <Navbar pageUpdater={setPage} />}
            {(page === 1) && <MenuCard page={page} menuData={appetizers} pageUpdater={setPage} />}
            {(page === 2) && <MenuCard page={page} menuData={breakfast} pageUpdater={setPage} />}
            {(page === 3) && <MenuCard page={page} menuData={brunch} pageUpdater={setPage} />}
            {(page === 4) && <MenuCard page={page} menuData={lunch} pageUpdater={setPage} />}
            {(page === 5) && <MenuCard page={page} menuData={dinner} pageUpdater={setPage} />}
            {(page === 6) && <MenuCard page={page} menuData={sides} pageUpdater={setPage} />}
            {(page === 7) && <MenuCard page={page} menuData={desserts} pageUpdater={setPage} />}
            {(page === 8) && <Menu pageUpdater={setPage} />}
            {(page === 9) && <Specials menuData={specials} pageUpdater={setPage} />}
            {(page > 0 && page != 8) && <Footer />} */ }
          </div>
        );
      }
      
      export default App;