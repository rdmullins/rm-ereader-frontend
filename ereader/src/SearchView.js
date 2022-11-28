function SearchView(props) {

    return (
        <div className="container">
            <div className="row text-center">
                <div className="col">
                    <h1>Search Results</h1>
                </div>
            </div>
            <div className="row text-center">
                <div className="col">
                    Searching for: {props.searchTerm}
                </div>
                <div className="col">
                    Search Type: {props.searchType}
                </div>
            </div>
        </div>
    )
}

export default SearchView;