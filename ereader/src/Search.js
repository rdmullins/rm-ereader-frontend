function Search() {
    return (
        <div className="container border p-1">
            <div className="row">
                <div className="col-1"></div>
                <div className="col-10 input-group mb-3">
                    <input type="text" className="form-control" placeholder="Search..." aria-label="Search Box" aria-describedby="searchButton"></input>
                    <button className="btn btn-outline-secondary" type="button" id="searchButton">Search</button>
                </div>
                <div className="col-1"></div>
            </div>
            <div className="row text-center">
                <ul className="list-group list-group-horizontal">
                    <li className="col-4 list-group-item border-0">
                        <input className="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="title"></input>
                        <label className="form-check-label" htmlFor="title">Title</label>
                    </li>
                    <li className="col-4 list-group-item border-0">
                        <input className="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="author"></input>
                        <label className="form-check-label" htmlFor="author">Author</label>
                    </li>
                    <li className="col-4 list-group-item border-0">
                        <input className="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="subject"></input>
                        <label className="form-check-label" htmlFor="subject">Subject</label>
                    </li>
                </ul>
                {/* <div className="input-group">
                    <div className="input-group-text">
                        <div className="col-4">
                            <input className="form-check-input mt-0" type="radio" value="" aria-label="Radio Button for Title Search"></input>
                            Title
                        </div>
                        <div className="col-4">
                            <input className="form-check-input mt-0" type="radio" value="" aria-label="Radio Button for Author Search"></input>
                            Author (Last Name)
                        </div>
                        <div className="col-4">
                            <input className="form-check-input mt-0" type="radio" value="" aria-label="Radio Button for Subject Search"></input>
                            Subject
                        </div>
                    </div> 
                </div> */}
            </div>
        </div>
    )
};

export default Search;