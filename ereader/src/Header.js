import { Book } from 'react-bootstrap-icons';

function Header() {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <a className="navbar-brand" href="#">
                        <Book alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/>
                        Rog-eReader
                    </a>
                </div>
            </div>
            <nav className="row">
                <a className="col-6 col-md-3 nav-item nav-link border p-1" href="#">The Public Domain</a>
                <a className="col-6 col-md-3 nav-item nav-link border p-1" href="#">About</a>
                <a className="col-6 col-md-3 nav-item nav-link border p-1" href="#">Contact</a>
                <a className="col-6 col-md-3 nav-item nav-link border p-1" href="#">Log In / Register</a>
            </nav>
        </div>
    )
};

export default Header;