import { useState } from 'react';
import { HouseFill, PersonPlus } from 'react-bootstrap-icons';
import { List } from 'react-bootstrap-icons';
import { BookFill } from 'react-bootstrap-icons';
import { XCircleFill } from 'react-bootstrap-icons';
import "./App.css";

function Footer(props) {

    const [menu, setMenu] = useState(false);

    function toggleMenu() {
        setMenu(!menu);
    }

    if (menu) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    function toggleDarkMode() {
        props.setDarkMode(!props.darkMode);
    }

    if (props.darkMode) {
        document.body.classList.remove("bg-light");
        document.body.classList.remove("text-dark");
        document.body.classList.add("bg-dark");
        document.body.classList.add("text-light");

        let e = document.getElementsByClassName("modal-content");
        for (let i=0; i<e.length; i++) {
            e[i].classList.add("dark-mode-modal");
            e[i].classList.remove("modal-content");
        }

    } else {
        document.body.classList.remove("bg-dark");
        document.body.classList.remove("text-light");
        document.body.classList.add("bg-light");
        document.body.classList.add("text-dark");

        let e = document.getElementsByClassName("modal");
        for (let i=0; i<e.length; i++) {
            //e[i].classList.add("modal-content");
            e[i].classList.remove("dark-mode-modal");
        };
    }

    return (
        <>
        <div className="vp-page-background">
            <div className="container fixed-bottom vp-page-background">
                <div className="row text-center fixed-bottom vp-page-background">
                    <div className="col-4 clickable"><h3 className="vp-svg"><HouseFill onClick={() => props.setView("home")}></HouseFill></h3></div>
                    <div className="col-4 clickable"><h3 className="vp-svg"><List onClick={toggleMenu}></List></h3></div>
                    <div className="col-4 clickable"><h3 className="vp-svg"><BookFill onClick={() => props.setView("myBooks")}></BookFill></h3></div>
                </div>
            </div>
        </div>

            {menu && (
            <div className="modal">
            <div onClick={toggleMenu} className="overlay"></div>
            <div className="modal-content">
                <h2 className="vp-featured-text">Menu</h2>
                <p className="vp-body-text">
                <ul>
                    <li><a href="#" onClick={()=>props.setView("myBooks")}>View Your Reading List</a></li>
                    {/* <li><a href="#" onClick={()=>props.setView("EPub2")}>View Your Notes</a></li> */}
                    {/* <li><button className="vp-button" onClick={() => toggleDarkMode()}>Light/Dark Mode</button></li> */}
                </ul>
                </p>
                <h2 className="close-modal vp-svg" onClick={toggleMenu}>
                    <XCircleFill></XCircleFill>
                </h2>
            </div>
            </div>
        )}

        </>
    )
};

export default Footer;