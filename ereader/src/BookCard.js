function BookCard(props) {

    // let x = Math.floor(Math.random() * props.bookData.length);

    // console.log("Random book = ", x);

    // let title = props.bookData[x].title;
    // let desc = props.bookData[x].description;

    // console.log(title);
    // console.log(desc);

    return (
        <div className="container">
        <div className="row">
        <div className="card mb-3 col-12 col-md-8">
            <div className="row">
                <div className="card-body">
                    <div className="row">
                        <div className="col-3">
                            <img src="./logo192.png" className="img-fluid border"></img>
                        </div>
                        <div className="col-6">
                            <h5>Title</h5>
                            <p>Author</p>
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
                <h3>Title</h3>
                <p>Description</p>
            </div>
        </div>
        </div>
    )
};

export default BookCard