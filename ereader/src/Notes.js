import { useState } from "react";
import { XCircleFill } from "react-bootstrap-icons";
import { CSVLink, CSVDownload } from "react-csv";
import { jsPDF } from "jspdf";

function Notes(props) {

    const [noteModal, setNoteModal] = useState(false);
    const [newNote, setNewNote] = useState(false);
    const [existingNote, setExistingNote] = useState(false);
    const [existingNoteModalNoteTitle, setExistingNoteModalNoteTitle] = useState("");
    const [existingNoteModalNoteLoc, setExistingNoteModalNoteLoc] = useState("");
    const [existingNoteModalNoteBody, setExistingNoteModalNoteBody] = useState("");
    const [existingNoteUpdated, setExistingNoteUpdated] = useState(0);

    const notesPDF = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: [8.5, 11]
    })
    
    let existingNoteArray = [];
    let existingNoteModalBody = [];

    function createPDFExport() {
    
        notesPDF.setFontSize(10);
    
        // Header 
        notesPDF.text("VoxPublica eReader Notes Export", 1,1);
        
        // Book Info
        notesPDF.text(`${props.bookData[0].title}`, 1, 1.25);
        notesPDF.text(`${props.bookData[0].authors[0].last_name}, ${props.bookData[0].authors[0].first_name} (${props.bookData[0].authors[0].dob}-${props.bookData[0].authors[0].dod})`, 1,1.5);

        let lineSpace = 1.8;

        // Loop Through and Print Notes
        for (let i=0; i<currentBookNotes.length; i++) {
            notesPDF.text(`${currentBookNotes[i].noteTitle}`,1,lineSpace);
            lineSpace = lineSpace + 0.15;
            notesPDF.text(`${currentBookNotes[i].location}`,1,lineSpace);
            lineSpace = lineSpace + 0.15;
            notesPDF.text(`${currentBookNotes[i].noteBody}`,1.5,lineSpace, {maxWidth: 5.5});
            lineSpace = lineSpace + 0.5;    
        }
        
        // Export PDF
        notesPDF.save(`VoxPublica Note Export - ${props.bookData[0].title}`);
    }

    function toggleNoteModal() {
        setNoteModal(!noteModal);
    }

    function toggleNewNoteModal() {
        setNewNote(!newNote);
    }

    // Check localStorage for Notes; if not found, CREATE

    if (localStorage.getItem("bookNotes") === null) {
        localStorage.setItem("bookNotes", JSON.stringify([
          {
            bookID: 0,
            bookTitle: "",
            bookAuthor: "",
            updated: 0,
            location: "",
            noteTitle: "",
            noteBody: "",
            visible: false,
          }
        ]))
      };
  
    // READ readingList from localStorage into state

    const [bookNotes, setBookNotes] = useState(JSON.parse(localStorage.getItem(("bookNotes"))));
 
    function processNewNote(e) {
        let dateUpdated = Date.now();
        // console.log("Book Data: ", props.bookData);
        // console.log("Inside process new note function.");
        // console.log(e);
        // console.log("Location of Note: ", e.target.form[0].value);
        // console.log("Title of Note: ", e.target.form[1].value);
        // console.log("Body of Note: ", e.target.form[2].value);
        // console.log("bookID: ", props.bookData[0].gut_id);
        // console.log("bookTitle: ", props.bookData[0].title);
        // console.log("bookAuthor: ", `${props.bookData[0].authors[0].last_name}, ${props.bookData[0].authors[0].first_name} (${props.bookData[0].authors[0].dob}-${props.bookData[0].authors[0].first_dod}`);
        // console.log("updated: ", dateUpdated);
        // console.log("location: ", e.target.form[0].value);
        // console.log("noteTitle: ", e.target.form[1].value);
        // console.log("noteBody: ", e.target.form[2].value);
        // console.log("visible: ", true);

        

        let updatedBookNotes = [
        ...bookNotes, {
            bookID: props.bookData[0].gut_id,
            bookTitle: props.bookData[0].title,
            bookAuthor: `${props.bookData[0].authors[0].last_name}, ${props.bookData[0].authors[0].first_name} (${props.bookData[0].authors[0].dob}-${props.bookData[0].authors[0].dod})`,
            updated: dateUpdated,
            location: e.target.form[0].value,
            noteTitle: e.target.form[1].value,
            noteBody: e.target.form[2].value,
            visible: true,
        }
        ];

        setBookNotes(updatedBookNotes);
        localStorage.setItem("bookNotes", JSON.stringify(updatedBookNotes)); 
        toggleNewNoteModal(); 
    };

    // READ current book's notes from localStorage

    let currentBookNotes = [];

    for (let i=0; i<bookNotes.length; i++) {
        if (bookNotes[i].bookID === props.bookData[0]?.gut_id && bookNotes[i].visible === true) {
            currentBookNotes.push(bookNotes[i]);
        }
    }

    let currentBookNotesList = [];
    
    currentBookNotesList = currentBookNotes.map(note =>
        <li key={note.updated} id={note.updated} onClick={() => {
        }}>
            <a href="#" className="dropdown-item" data-my-variable={note.updated} onClick={(e)=>toggleExistingNoteModal(e)}>{note.noteTitle}</a>
            {/* <a href="#" className="dropdown-item" data-my-variabe={note.updated} data-bs-toggle="popover" data-bs-title="Popover title" data-bs-content="And here's some amazing content. It's very engaging. Right?">{note.noteTitle.}</a> */}
        </li>
    )

    console.log("CurrentBookNotes Array: ", currentBookNotes);
    console.log("CurrentBookNotesList = ", currentBookNotesList);

    function toggleExistingNoteModal(e) {
        //console.log(e.target.dataset.myVariable);
        console.log("Entered toggleExistingNoteModal");
        for (let i = 0; i<currentBookNotes.length; i++) {
            if (currentBookNotes[i].updated == e.target.dataset.myVariable) {
                existingNoteArray.push(currentBookNotes[i])
            }
        }

        console.log("Note found - value is ", existingNoteArray);
        console.log("Note Title: ", existingNoteArray[0].noteTitle);
        console.log("Note location: ", existingNoteArray[0].location);
        console.log("Note body: ", existingNoteArray[0].noteBody);
        console.log("Now leaving toggleExistingNoteModal");
        
        setExistingNoteModalNoteTitle(existingNoteArray[0].noteTitle);
        setExistingNoteModalNoteLoc(existingNoteArray[0].location);
        setExistingNoteModalNoteBody(existingNoteArray[0].noteBody);
        setExistingNoteUpdated(existingNoteArray[0].updated);

        //existingNoteArray

        // existingNoteModalBody = existingNoteArray.map(element => {
        // <ul>
        //     <li>element.noteTitle</li>
        //     <li>element.location</li>
        //     <li>element.noteBody</li>
        // </ul>
        // })


        setExistingNote(!existingNote);
    };

    function editLocation() {
        //console.log("Edit location");
        let newLocation = prompt("Enter a new value for note location. If you do not want to change the location, leave the field blank.");
        let newUpdated = Date.now();
        if (newLocation === "" || newLocation === null) {
            return;
        }
        let tempNote = [...bookNotes];
        let hold = bookNotes.findIndex(note => (note.updated === existingNoteUpdated));
        //console.log("Hold = ", hold, " and tempNote[hold] = ", tempNote[hold]);
        tempNote[hold].location = newLocation;
        tempNote[hold].updated = newUpdated;
        //console.log("TempNote is ", tempNote);
        setBookNotes(tempNote);
        localStorage.setItem("bookNotes", JSON.stringify(tempNote));
        return;
    }

    function editNoteTitle() {
        //console.log("Edit location");
        let newTitle = prompt("Enter a new value for note title. If you do not want to change the title, leave the field blank.");
        let newUpdated = Date.now();
        if (newTitle === "" || newTitle === null) {
            return;
        }
        let tempNote = [...bookNotes];
        let hold = bookNotes.findIndex(note => (note.updated === existingNoteUpdated));
        //console.log("Hold = ", hold, " and tempNote[hold] = ", tempNote[hold]);
        tempNote[hold].noteTitle = newTitle;
        tempNote[hold].updated = newUpdated;
        //console.log("TempNote is ", tempNote);
        setBookNotes(tempNote);
        localStorage.setItem("bookNotes", JSON.stringify(tempNote));
        return;
    }

    function editNoteBody() {
        //console.log("Edit Body")
        let newBody = prompt("Enter a new value for note body. If you do not want to change the body, leave the field blank.");
        let newUpdated = Date.now();
        if (newBody === "" || newBody === null) {
            return;
        }
        let tempNote = [...bookNotes];
        let hold = bookNotes.findIndex(note => (note.updated === existingNoteUpdated));
        //console.log("Hold = ", hold, " and tempNote[hold] = ", tempNote[hold]);
        tempNote[hold].noteBody = newBody;
        tempNote[hold].updated = newUpdated;
        //console.log("TempNote is ", tempNote);
        setBookNotes(tempNote);
        localStorage.setItem("bookNotes", JSON.stringify(tempNote));
        return;
    }

    function deleteNote() {
        //console.log("Edit Body")
        //let newBody = prompt("Enter a new value for note body. If you do not want to change the body, leave the field blank.");
        let newUpdated = Date.now();
        // if (newBody === "" || newBody === null) {
        //     return;
        // }
        let tempNote = [...bookNotes];
        let hold = bookNotes.findIndex(note => (note.updated === existingNoteUpdated));
        //console.log("Hold = ", hold, " and tempNote[hold] = ", tempNote[hold]);
        tempNote[hold].visible = false;
        tempNote[hold].updated = newUpdated;
        //console.log("TempNote is ", tempNote);
        setBookNotes(tempNote);
        localStorage.setItem("bookNotes", JSON.stringify(tempNote));
        return;
    }

    // Build CSV Data

    const csvData = [
        ["firstname", "lastname", "email"],
        ["Ahmed", "Tomi", "ah@smthing.co.com"],
        ["Raed", "Labes", "rl@smthing.co.com"],
        ["Yezzi", "Min l3b", "ymin@cocococo.com"]
      ];

    return (
        <>
            <button onClick={() => createPDFExport()}>Click to Generate Test PDF</button>
            <div className="container">
            <hr/>
            <button 
                type="button" 
                class="btn btn-info"
                onClick={() => {
                    toggleNoteModal();
                }}
                >Notes&nbsp;&nbsp; 
                <span class="badge text-bg-danger">{currentBookNotes.length}</span>
            </button>
            <hr/>
            </div>

            {(noteModal) &&
                <div className="modal">
                <div onClick={toggleNoteModal} className="overlay"></div>
                <div className="modal-content">
                    <h2>Notes</h2>
                    <h4>{props.bookData[0].title}</h4>
                    <br/>
                    <button className="btn btn-lg w-100 btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Notes List    
                    </button>
                    <ul className="dropdown-menu">
                        {currentBookNotesList}
                    </ul>
                    <p>
                        <hr></hr>
                    </p>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <button className="btn btn-lg w-100 btn-info"
                                    onClick={()=> toggleNewNoteModal()}
                                >New Note</button>
                            </div>
                            <div className="col-6">
                                <button className="btn btn-lg btn-info"><span className="plain-text"><CSVLink data={csvData}>Download All Notes for This Book (CSV)</CSVLink></span></button>
                            </div>
                        </div>
                    </div>
                        <h2 className="close-modal" onClick={()=>toggleNoteModal()}>
                        <XCircleFill></XCircleFill>
                    </h2>

                </div>
                </div>
            }

            {(newNote) &&
                <div className="modal">
                <div onClick={toggleNoteModal} className="overlay"></div>
                <div className="modal-content">
                    <h2>Create New Note</h2>
                    <h4>{props.bookData[0].title}</h4>
                    <br/>
                    <form>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="locationInput" placeholder="Location in Text"/>
                            <label for="locationInput">Location</label>
                            <div id="locationHelpBlock" className="form-text">
                                Add a location to help you find the relevent spot in the text (such as a page number).
                            </div>
                        </div>

                        <div className="form-floating">
                            <input type="text" className="form-control" id="titleInput" placeholder="Title of Note"/>
                            <label for="titleInput">Title</label>
                            <div id="titleHelpBlock" className="form-text">
                                Add a title to help you identify the note in your Notes list. This is a title for the note, not the book (that is saved automatically).
                            </div>
                        </div>
                        <hr></hr>
                        <div className="form-floating">
                            <textarea rows="6" className="form-control" id="noteBodyInput" placeholder="Body of Note"/>
                            <label for="noteBodyInput">Body of Note</label>
                        </div>        
                        <hr></hr>
                        <button className="btn btn-lg w-100 btn-info" type="submit" onClick={(e)=> {
                            e.preventDefault(e)
                            processNewNote(e)
                            }}
                            >Create Note</button>
                    </form>
                    
                    <h2 className="close-modal" onClick={()=> {
                        toggleNewNoteModal()
                    }}>
                        <XCircleFill></XCircleFill>
                    </h2>
                </div>
                </div>
            }

            {(existingNote) &&
                <div className="modal">
                <div onClick={toggleNoteModal} className="overlay"></div>
                <div className="modal-content">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h2>View/Edit Note</h2>
                                <h4>{props.bookData[0].title}</h4>
                                <h5>{`${props.bookData[0].authors[0].last_name}, ${props.bookData[0].authors[0].first_name} (${props.bookData[0].authors[0].dob}-${props.bookData[0].authors[0].dod})`}</h5>
                                <h6><em><strong>Double-Click a Field to Edit</strong></em></h6>
                            </div>
                        </div>
                        <div className="row">
                            <table className = "table table-hover table-striped overflow-auto h-auto">
                                <tbody>
                                    <tr key="existing-note-1">
                                        <td className="col-2">
                                            Note Title:
                                        </td>
                                        <td className="col-10" onDoubleClick={()=>editNoteTitle()}>
                                            {existingNoteModalNoteTitle}
                                        </td>
                                    </tr>
                                    <tr key="existing-note-2">
                                        <td className="col-2">
                                            Note Location:
                                        </td>
                                        <td className="col-10" onDoubleClick={()=>editLocation()}>
                                            {existingNoteModalNoteLoc}
                                        </td>
                                    </tr>
                                    <tr key="existing-note-3">
                                        <td className="col-2">
                                            Note:
                                        </td>
                                        <td className="col-10" onDoubleClick={()=>editNoteBody()}>
                                            {existingNoteModalNoteBody}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className="btn btn-lg btn-info" onClick={()=>deleteNote()}>Delete This Note</button>

                            <button className="btn btn-lg btn-info"><CSVLink data={csvData}>Download This Note (CSV)</CSVLink></button>
                        </div>
                    </div>
                    
                    <h2 className="close-modal" onClick={()=> {
                        setExistingNote(!existingNote);
                    }}>
                        <XCircleFill></XCircleFill>
                    </h2>
                </div>
                </div>
            }


{/* bookID: 0,
            bookTitle: "",
            bookAuthor: "",
            updated: 0,
            location: "",
            noteTitle: "",
            noteBody: "",
            visible: false, */}

        </>
    )
};

export default Notes;