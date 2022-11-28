function Collections() {

let coverList = [];
let coverScroll = {};

    function MakeCoverList() {
        for (let i=1; i<2; i++) {
            coverList.push("./logo192.png");
        }
    };

    MakeCoverList();

    coverScroll = coverList.map(cover => 
        <div className="col">
            <img src={cover} className="image-fluid border collection-cover"></img>
            <p>
                <a href="#">Read</a> | <a href="#">Listen</a><br/><a href="#">Details</a>
            </p>
        </div>
    );

    return (
        <>
            <div className="container">
            <div className="row">
                <div className="border col-12 col-md-8 d-inline-block p-2 vh-25">
                    <div className="row text-center g-0">
                        <div className="border d-inline-block p-2 overflow-auto vh-25">{coverScroll}</div>
                    </div>
                </div>
                
                <div className="border col-12 col-md-4 d-inline-block vh-25 p-2">

                    <div>
                        <h4>Collections</h4>
                        <ul>
                            <li>Blah</li>
                            <li>Blah</li>
                            <li>Blah</li>
                        </ul>
                    </div>
                    
                </div>
            </div>
            </div>
        </>
    );
};

export default Collections;
