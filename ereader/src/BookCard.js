function BookCard() {
    return (
        <div className="container border">
        <div className="row">
        <div className="card mb-3 col-12 col-md-8">
            <div className="row">
                <div className="card-body">
                    <div className="row">
                        <div className="col-4">
                            <img src="./logo192.png" className="img-fluid border"></img>
                        </div>
                        <div className="col-5">
                            <h5>Title</h5>
                            <p>Author</p>
                        </div>
                        <div className="col-3">
                            <button>Read Now</button>
                            <button>Listen Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div className="col-12 col-md-4 p-2">
                <h3>Title</h3>
                <p>Description</p>
            </div>
        </div>
        </div>
    )
};

export default BookCard