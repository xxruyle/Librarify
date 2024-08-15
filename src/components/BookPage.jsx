import { useEffect, useState, CSSProperties} from "react";
import { RiseLoader } from "react-spinners";
import override from "./spinner-override.jsx"




function BookPage({getBook, handleAddToCart}) 
{
    const [book, setBook] = useState();

    useEffect(() => {
        const waitForBook = async () => {
            const res = await getBook().then((data) => {return data});
            setBook(res);
        }
        waitForBook();
    }, [])

    if (book) {
        return (
            <>
                <div className="book-page-container">
                    <div className="book-page-cover-container">
                        <img  className="book-page-cover" src={book.coverImage} alt={book.title}/>
                        <div className="book-page-price">{book.price}</div>
                        <button onClick={() => handleAddToCart(book)} className="book-page-addtocart">Add To Cart</button>
                    </div>

                    <div className="book-page-info-container">
                        <div className="book-page-title">{book.title}</div>
                        <div className="book-page-author">by {book.author}</div>
                        <hr/>
                        <div className="book-page-description">{book.description}</div>

                        <div className="book-page-moreinfo-container">
                            <div className="book-page-isbn">ISBN: {book.isbn}</div>
                            <div className="book-page-pagecount">Pages: {book.pageCount} </div>
                            <div className="book-page-publisher">Publisher: {book.publisher}</div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                  <RiseLoader
                    color={"#1e1e1e"}
                    loading={true}
                    cssOverride={override}
                    size={10}
                    aria-label=""
                    data-testid="loader"
                />
            </>

        );
    }



}

export default BookPage;