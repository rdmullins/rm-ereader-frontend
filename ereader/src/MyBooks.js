import BookCard from "./BookCard";

function MyBooks() {
    return (
        <>
            <div className="container">
                <div className="row text-center">
                    <div className="col">
                        <h1>My Books</h1>
                    </div>
                </div>
            </div>
            <BookCard />
        </>
    )
};

export default MyBooks;