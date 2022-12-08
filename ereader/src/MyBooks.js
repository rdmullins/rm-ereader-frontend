import BookCard from "./BookCard";
import { useEffect } from "react";
import axios from "axios";

function MyBooks(props) {

    let APIBookResults = [];

    async function searchMyBooks(rlist) {
        props.setMyBookSearch(`https://8000-rdmullins-rmereaderback-gvtdimo6rdt.ws-us78.gitpod.io/books/bookbyid/?search=${rlist}/`);
        let returnedBook = await props.myBookSearch;
        APIBookResults.push(returnedBook);
    }

    console.log("Inside myBooks - props.bookData is ", props.bookData);

    let myActiveReadingList = props.readingList.filter(book =>
        book.isActive === true);

    let myReadingList = myActiveReadingList.map(book =>
        book.bookID);

    console.log(myReadingList);



    for (let i=0; i<myReadingList.length; i++) {
        searchMyBooks(myReadingList[i]);
    }

    console.log("API Book Results: ", APIBookResults);
    //https://8000-rdmullins-rmereaderback-gvtdimo6rdt.ws-us78.gitpod.io/
    return (
        <>
            <div>
                Book Data is {props.bookData}
            </div>
            <div className="container">
                <div className="row text-center">
                    <div className="col">
                        <h1>My Books</h1>
                        <ul>
                            {/* {myReadingList} */}
                        </ul>
                    </div>
                </div>
            </div>
            <BookCard />
        </>
    )
};

export default MyBooks;