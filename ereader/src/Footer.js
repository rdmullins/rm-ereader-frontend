import { HouseFill } from 'react-bootstrap-icons';
import { List } from 'react-bootstrap-icons';
import { BookFill } from 'react-bootstrap-icons';

function Footer() {
    return (
        <div className="container border">
            <div className="row text-center">
                <div className="col-4 border"><h4><HouseFill></HouseFill></h4></div>
                <div className="col-4 border"><h4><List></List></h4></div>
                <div className="col-4 border"><h4><BookFill></BookFill></h4></div>
            </div>
        </div>
    )
};

export default Footer;