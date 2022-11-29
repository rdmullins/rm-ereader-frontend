import { useState } from 'react';
import { Book, PersonPlus } from 'react-bootstrap-icons';
import { XCircleFill } from 'react-bootstrap-icons';
import { EnvelopeFill, Linkedin, Github } from 'react-bootstrap-icons';
//import { }
import "./App.css";

function Header(props) {

    const [pubDomain, setPubDomain] = useState(false);
    const [contact, setContact] = useState(false);
    const [about, setAbout] = useState(false);
    const [login, setLogin] = useState(false);

    function togglePublicDomain() {
        setPubDomain(!pubDomain);
    }

    function toggleContact() {
        setContact(!contact);
    }

    function toggleAbout() {
        setAbout(!about);
    }

    function toggleLogin() {
        setLogin(!login);
    }

    if(pubDomain || contact || about || login) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal') 
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
            e[i].classList.remove("dark-mode-modal")
        };
    }

    return (
        <>
            <div className="container">
                <div className="row p-2">
                    <div className="col" onClick={() => props.setView("home")}>
                        <a className="navbar-brand" href="#">
                            <h2><Book alt="Logo" width="30" height="40" className="d-inline-block align-text-top p-1"/>
                            Rog-eReader</h2>
                        </a>
                    </div>
                </div>
                <nav className="row text-center">
                    <div className="col-6 col-md-3 nav-item nav-link bg-info opacity-75 border p-1 clickable" onClick={togglePublicDomain}>The Public Domain</div>
                    <div className="col-6 col-md-3 nav-item nav-link bg-info opacity-75 border p-1 clickable" onClick={toggleAbout}>About</div>
                    <div className="col-6 col-md-3 nav-item nav-link bg-info opacity-75 border p-1 clickable" onClick={toggleContact}>Contact</div>
                    <div className="col-6 col-md-3 nav-item nav-link bg-info opacity-75 border p-1 clickable" onClick={toggleLogin}>Login/Register</div>
                </nav>
            </div>

            {pubDomain && (
            <div className="modal">
            <div onClick={togglePublicDomain} className="overlay"></div>
            <div className="modal-content">
                <h2>What Is the Public Domain?</h2>

                <blockquote cite="https://en.wikipedia.org/wiki/Public_domain">"The public domain (PD) consists of all the creative work to which no 
                exclusive intellectual property rights apply. Those rights may have 
                expired, been forfeited, expressly waived, or may be inapplicable. 
                Because those rights have expired, anyone can legally use or reference 
                those works without permission."
                </blockquote>
                <em>- Wikipedia</em>

                <p>
                    Many classic works of literature are in the pubic domain due to the reasons
                    cited above. <em>VoxPublica</em> seeks to make these works available to everyone
                    using familiar e-reader functionality.
                </p>

                    <h4>Additional Information</h4>
                    <ul>
                        <li><a href="https://web.law.duke.edu/cspd/" target="blank">Duke University Center for the Study of the Public Domain</a></li>
                        <li><a href="https://www.gutenberg.org" target="blank">Project Gutenberg</a></li>
                        <li><a href="https://www.librivox.org" target="blank">Librivox</a></li>
                    </ul>

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
                            <h1><a href="mailto:rogermullins.mba@gmail.com" target="blank"><EnvelopeFill></EnvelopeFill></a></h1>
                        </div>
                        <div className="col-4">
                            <h1><a href="https://www.linkedin.com/in/rdmullins" target="blank"><Linkedin></Linkedin></a></h1>
                        </div>
                        <div className="col-4">
                            <h1><a href="https://www.github.com/rdmullins" target="blank"><Github></Github></a></h1>
                        </div>
                    </div>
                <h2 className="close-modal" onClick={toggleContact}>
                <XCircleFill></XCircleFill>
                </h2>
            </div>
            </div>
        )}

        {about && (
            <div className="modal">
            <div onClick={toggleAbout} className="overlay"></div>
            <div className="modal-content">
                <h2>About</h2>
                    <p>
                        Lorem ipsum etc.
                    </p>
                <h2 className="close-modal" onClick={toggleAbout}>
                <XCircleFill></XCircleFill>
                </h2>
            </div>
            </div>
        )}

        {login && (
            <div className="modal">
            <div onClick={toggleLogin} className="overlay"></div>
            <div className="modal-content">
                <h2>Log In</h2>
                <form>
                    <div className="row mb-3">
                        <label for="loginEmail" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="loginEmail"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label for="loginPW" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="loginPW"/>
                        </div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </form>
                <h2 className="close-modal" onClick={toggleLogin}>
                <XCircleFill></XCircleFill>
                </h2>
            </div>
            </div>
        )}

        </>
    )
};

export default Header;