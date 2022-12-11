function Categories(props) {
    return (
        <div className="container">
            <div className="row text-center vp-body-text">
                <div className="col-6 col-md-4 border vp-button clickable" onClick={() => props.setView("Fiction")}>Fiction</div>
                <div className="col-6 col-md-4 border vp-button clickable" onClick={() => props.setView("Non-Fiction")}>Non-Fiction</div>
                <div className="col-6 col-md-4 border vp-button clickable" onClick={() => props.setView("Poetry")}>Poetry</div>
                <div className="col-6 col-md-4 border vp-button clickable" onClick={() => props.setView("Short Stories")}>Short Stories</div>
                <div className="col-6 col-md-4 border vp-button clickable" onClick={() => props.setView("Classical")}>Classical</div>
                <div className="col-6 col-md-4 border vp-button clickable" onClick={() => props.setView("Drama")}>Drama</div>
            </div>
        </div>
    )

};

export default Categories