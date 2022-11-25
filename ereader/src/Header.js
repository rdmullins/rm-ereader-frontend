import { Book } from 'react-bootstrap-icons';

function Header() {
    return (
        <nav class="navbar bg-light">
           <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <Book alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/> Roger's eReader
                </a>
            </div>
        </nav>
    )
};

export default Header;