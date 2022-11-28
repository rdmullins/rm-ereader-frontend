import { useState } from 'react';
import { HouseFill } from 'react-bootstrap-icons';
import { List } from 'react-bootstrap-icons';
import { BookFill } from 'react-bootstrap-icons';
import "./App.css";

function Footer() {

    const [menu, setMenu] = useState(false);

    function toggleMenu() {
        setMenu(!menu);
    }

    if (menu) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>
            <div className="container border">
                <div className="row text-center">
                    <div className="col-4 border"><h4><HouseFill></HouseFill></h4></div>
                    <div className="col-4 border"><h4><List onClick={toggleMenu}></List></h4></div>
                    <div className="col-4 border"><h4><BookFill></BookFill></h4></div>
                </div>
            </div>

            {menu && (
            <div className="modal">
            <div onClick={toggleMenu} className="overlay"></div>
            <div className="modal-content">
                <h2>Menu</h2>
                <p>
                <ul>
                    <li>Menu Item Goes Here</li>
                    <li>And Another One Here</li>
                    <li>And Here</li>
                </ul>
                </p>
                <button className="close-modal" onClick={toggleMenu}>
                CLOSE
                </button>
            </div>
            </div>
        )}

        </>
    )
};

export default Footer;