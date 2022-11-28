import { useState } from 'react';
import { HouseFill } from 'react-bootstrap-icons';
import { List } from 'react-bootstrap-icons';
import { BookFill } from 'react-bootstrap-icons';
import { XCircleFill } from 'react-bootstrap-icons';
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
                    <div className="col-4 border"><h3><HouseFill></HouseFill></h3></div>
                    <div className="col-4 border"><h3><List onClick={toggleMenu}></List></h3></div>
                    <div className="col-4 border"><h3><BookFill></BookFill></h3></div>
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
                <h2 className="close-modal" onClick={toggleMenu}>
                    <XCircleFill></XCircleFill>
                </h2>
            </div>
            </div>
        )}

        </>
    )
};

export default Footer;