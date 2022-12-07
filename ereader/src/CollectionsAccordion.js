function CollectionsAccordion(props) {

    let listedCollections = [];

    function buildCollectionsList() {

      let publicCollections = props.collectionsList.filter(allCollections => 
          allCollections.is_public === true);

      listedCollections = publicCollections.map(coll => (
        <div className="accordion-item" key={coll.id}>
          <h2 className="accordion-header" id={`id-${coll.id}`}>
            <button className="accordion-button" type="button" data-bs-toggle="show" data-bs-target={`#target-${coll.id}`} aria-expanded="false" aria-controls={`collapse-${coll.id}`}>
              {coll.name}
            </button>
          </h2>
          <div id={`collapse-${coll.id}`} className="accordion-collapse collapse" aria-labelledby={`${coll.id}`} data-bs-parent={`id-${coll.id}`}>
            <div className="accordion-body">
              Book list is going to go here.
            </div>
          </div>
        </div>
      ))
  }

  buildCollectionsList();

  return (
    <>
      <div className="accordion" id="collections">
        {listedCollections}
      </div>
    </>
  )

};

export default CollectionsAccordion