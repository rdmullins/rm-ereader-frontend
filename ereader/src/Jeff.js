import jeffImg from "./Jeff.jpeg";

function Jeff() {
    return (
        <>
            <div className="container">
                <div className="row text-center">
                    <div className="col vp-featured-text">
                        <h1>Jeff!</h1>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col">
                        <img src={jeffImg} alt="It's Jeff!"></img>
                    </div>
                </div>
                <div className="row text-center vp-body-text">
                    <div className="col">
                        <h2><a href="https://www.linkedin.com/in/jeff-goens-3252247b/">Jeff</a> didn't make this page. If he did, it would look cooler.</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Jeff;