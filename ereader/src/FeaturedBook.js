function FeaturedBook(props) {

    // let featuredBookCard = props.featuredBookData[0].map(book =>

    //     )

    // const {featuredBookData : {}} = props.featuredBookData;

    // const {
    //     id: 0;
    //     author: {
    //         id: 0;
    //         first_name: "";
    //         last_name: "";
    //         dob: "";
    //         dod: "";
    //     };
    //     book: {
    //         id: 0;
    //         gut_type: {
    //             id: 0;
    //             type: "";
    //         };
    //         gut_id: 0;
    //         title: "";
    //         lib_id: 0;
    //         gut_issued: 2022/01/01;
    //         description: "";
    //     };
    //     author_role: {
    //         id: 0;
    //         role: "";
    //     };
    // } = featuredBookData;
    if(props.featuredBookData){
        if(props.featuredBookData?.book){
            console.log(props.featuredBookData?.book[0].title);
            console.log(props.featuredBookData?.book[0].description);
            console.log(props.featuredBookData?.book[0].gut_id);
        }
        if (props.featuredBookData?.author){
            console.log(props.featuredBookData?.author[0].last_name);
            console.log(props.featuredBookData?.author[0].first_name);
            console.log(props.featuredBookData?.author[0].dob);
            console.log(props.featuredBookData?.author[0].dod);
        }
    }
    if(props.featuredBookData){
        if(props.featuredBookData?.book){
            return ( 
                <>
                    <div className="container">
                        <div className="row">
                            <div className="card mb-3 col-12 col-md-8">
                                <div className="row">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-3">
                                                <img src={`https://www.gutenberg.org/cache/epub/${props.featuredBookData?.book[0].gut_id}/pg${props.featuredBookData?.book[0].gut_id}.cover.medium.jpg`} className="img-fluid border" alt="Cover Image"></img>
                                            </div>
                                            <div className="col-6">
                                                <h5>{props.featuredBookData?.book[0].title}</h5>
                                                <p>{props.featuredBookData?.author[0].last_name}</p>
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
                                <h3>{props.featuredBookData?.book[0].title}</h3> 
                                <p>{props.featuredBookData?.book[0].description}</p>
                            </div>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                 <h2>Blah</h2>
                </>
                 
            )
        }
        
    };
}

export default FeaturedBook