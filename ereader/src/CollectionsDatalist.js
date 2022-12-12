function CollectionsDatalist(props) {

    let listedCollections = [];

    function buildCollectionsList() {

        let publicCollections = props.collectionsList.filter(allCollections => 
            allCollections.is_public === true);

        listedCollections = publicCollections.map(coll => (
            <li>{coll.name}</li>
        ))
    }

    buildCollectionsList();

    return (
        <div className="dropdown">
            <button className="btn btn-lg btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Collections    
            </button>
            <ul className="dropdown-menu">
                {listedCollections}
            </ul>
        </div>
    );
};

export default CollectionsDatalist;