function SearchView(props) {

    const searchList = props.bookData.map(book => 
        (
        <div className="container">
            <div className="row">
                <div className="card mb-3 col-12 col-md-8">
                    <div className="row">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-3">
                                    <img src={`https://www.gutenberg.org/cache/epub/${book.book[0].gut_id}/pg${book.book[0].gut_id}.cover.medium.jpg`} className="img-fluid border"></img>
                                </div>
                                <div className="col-6">
                                    <h5>{book.book[0].title}</h5>
                                    <p>{book.author[0].last_name}</p>
                                </div>
                                <div className="col-3">
                                    <button type="button" className="btn w-100 m-1 btn-info">Read Now</button>
                                    <button type="button" className="btn w-100 m-1 btn-info">Listen Now</button>
                                    <button type="button" className="btn w-100 m-1 btn-info">Info</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4 p-2">
                    <h3>{book.book[0].title}</h3>
                    <p>{book.book[0].description}</p>
                </div>
            </div>
        </div>
        ))

    return (
        <>
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
        <>
            {searchList}
        </>
        </>
    )
}

export default SearchView;