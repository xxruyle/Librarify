import { useEffect, useState } from "react";
import Book from "./Book";

const defaultPreviewImg = 
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsHCxOBgvJ1mMJ7QPAlGKlTksJNo5lVLRU2A&s";

const searchBooks = (searchValue) => {
    const value = `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&printType=books&orderBy=relevance&maxResults=40`
    const result = fetch(value)
                         .then( (response) =>  response.json())
                         .then( (data) => {
                            return  data.items; 
                         })

    return result 
}


function BookQueries({query="The Lord of the Rings"}) {
    const [bookQueries, setBookQueries] = useState([]); 
    const [currentQuery, setCurrentQuery] = useState(query);

    useEffect(() => {
        updateBookData(query);
    }, [])


    const updateQuery = () => {
        if (query !== currentQuery) {
            setCurrentQuery(query);
            updateBookData(currentQuery);
        }  
    }

    const getPrice = (book) => {
        const saleInfo = book.saleInfo.saleability; 
        if (saleInfo === "FOR_SALE")  {
            return "$ " + book.saleInfo.listPrice.amount; 
        } else if (saleInfo === "FREE") {
            return "FREE"; 
        } else {
            return "NOT FOR SALE";
        }
    }

    const getAuthors = (book) => {
        if (book.volumeInfo.hasOwnProperty("authors")) {
            return book.volumeInfo.authors.join(", ");
        }

        return "Unknown";
    }

    const getCover = (book) => {
        if (book.volumeInfo.hasOwnProperty("imageLinks"))  {
            return book.volumeInfo.imageLinks.thumbnail; 
        } else {
            return defaultPreviewImg;
        }
    }

    const getISBN = (book) => {
        if (book.volumeInfo.hasOwnProperty("industryIdentifiers")) {
            return book.volumeInfo.industryIdentifiers[0].identifier; 
        }

        return "ISBN Not found"

    }

    const updateBookData = async (query) => {
        setBookQueries([]);
        const res = await searchBooks(query).then(data => {return data});

        if (res) {
            const books = res.map((book) => {
                const author = getAuthors(book);
                const price = getPrice(book);
                const cover = getCover(book);
                const isbn = getISBN(book);

                const bookInfo = {
                    "id": book.id,
                    "isbn": isbn,
                    "title": book.volumeInfo.title,
                    "author": author,
                    "description": book.volumeInfo.description,
                    "price": price,
                    "coverImage": cover,
                }

                return bookInfo;
            })
            setBookQueries(books);
        }
    }

    const displayBooks = () => {
        updateQuery(); 
        return (
            bookQueries.map((query) => 
            <Book key={query.id} 
                  id={query.id}
                  isbn={query.isbn}
                  title={query.title} 
                  author={query.author}
                  price={query.price} 
                  img={query.coverImage}/>
            )
        );
    }

    return (
        <>
            {displayBooks()}
        </>
    );
}


export default BookQueries;