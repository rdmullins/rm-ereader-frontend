import { useState } from 'react';
import { Book } from 'react-bootstrap-icons';
import { XCircleFill } from 'react-bootstrap-icons';
import { EnvelopeFill, Linkedin, Github } from 'react-bootstrap-icons';
//import { }
import "./App.css";

function Header() {

    const [pubDomain, setPubDomain] = useState(false);
    const [contact, setContact] = useState(false);

    function togglePublicDomain() {
        setPubDomain(!pubDomain);
    }

    function toggleContact() {
        setContact(!contact);
    }

    if(pubDomain || contact) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal') 
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <a className="navbar-brand" href="#">
                            <h2><Book alt="Logo" width="30" height="40" className="d-inline-block align-text-top p-1"/>
                            Rog-eReader</h2>
                        </a>
                    </div>
                </div>
                <nav className="row">
                    <div className="col-6 col-md-3 nav-item nav-link border p-1" onClick={togglePublicDomain}>The Public Domain</div>
                    <a className="col-6 col-md-3 nav-item nav-link border p-1" href="#">About</a>
                    <div className="col-6 col-md-3 nav-item nav-link border p-1" onClick={toggleContact}>Contact</div>
                    <a className="col-6 col-md-3 nav-item nav-link border p-1" href="#">Log In / Register</a>
                </nav>
            </div>

            {pubDomain && (
            <div className="modal">
            <div onClick={togglePublicDomain} className="overlay"></div>
            <div className="modal-content">
                <h2>What Is the Public Domain?</h2>
                <p>
                <blockquote cite="https://en.wikipedia.org/wiki/Public_domain">"The public domain (PD) consists of all the creative work to which no 
                exclusive intellectual property rights apply. Those rights may have 
                expired, been forfeited, expressly waived, or may be inapplicable. 
                Because those rights have expired, anyone can legally use or reference 
                those works without permission."
                </blockquote>
                <em>- Wikipedia</em>
                </p>
                <p>
                    Many classic works of literature are in the pubic domain due to the reasons
                    cited above. <em>VoxPublica</em> seeks to make these works available to everyone
                    using familiar e-reader functionality.
                </p>
                <p>
                    <h4>Additional Information</h4>
                    <ul>
                        <li><a href="https://web.law.duke.edu/cspd/" target="blank">Duke University Center for the Study of the Public Domain</a></li>
                        <li><a href="https://www.gutenberg.org" target="blank">Project Gutenberg</a></li>
                        <li><a href="https://www.librivox.org" target="blank">Librivox</a></li>
                    </ul>
                </p>
                <h2 className="close-modal" onClick={togglePublicDomain}>
                <XCircleFill></XCircleFill>
                </h2>
            </div>
            </div>
        )}

        {contact && (
            <div className="modal">
            <div onClick={toggleContact} className="overlay"></div>
            <div className="modal-content">
                <h2>Contact</h2>
                    <div className="row text-center">
                        <div className="col">
                            <h1>Roger Mullins</h1>
                            <h2>Full Stack Web Developer</h2>
                            <h3>Based in Lexington, Kentucky, USA</h3>
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-4">
                            <h1><a href="mailto:rogermullins.mba@gmail.com"><EnvelopeFill></EnvelopeFill></a></h1>
                        </div>
                        <div className="col-4">
                            <h1><a href="https://www.linkedin.com/in/rdmullins"><Linkedin></Linkedin></a></h1>
                        </div>
                        <div className="col-4">
                            <h1><a href="https://www.github.com/rdmullins"><Github></Github></a></h1>
                        </div>
                    </div>
                <h2 className="close-modal" onClick={toggleContact}>
                <XCircleFill></XCircleFill>
                </h2>
            </div>
            </div>
        )}
        </>
    )
};

export default Header;