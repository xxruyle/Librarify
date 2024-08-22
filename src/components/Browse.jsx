import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Template from "./Template";
import Book from "./Book";
import BookPage from "./BookPage";

import { RiseLoader } from "react-spinners";
import override from "./spinner-override.jsx"

const defaultPreviewImg = 
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsHCxOBgvJ1mMJ7QPAlGKlTksJNo5lVLRU2A&s";

const searchBooks = (searchValue) => {
    const value = `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&printType=books&orderBy=relevance&maxResults=40`
    const result = fetch(value).catch(error => console.log(error))
                         .then( (response) =>  response.json())
                         .then( (data) => {
                            return  data.items; 
                         })

    return result 
}

const searchBookByID = (googleBookID) => {
    const value = `https://www.googleapis.com/books/v1/volumes/${googleBookID}`
    const result = fetch(value)
                   .then((response) => response.json()) 
                   .then((data) => {
                        return data; 
                   })

    return result; 
}


function BookQueries({queries, isLoading}) {
    const displayBooks = () => {

        if (queries.length) {
            return (
                queries.map((query) => 
                <Book key={query.id} 
                    id={query.id}
                    isbn={query.isbn}
                    title={query.title} 
                    author={query.author}
                    price={query.price} 
                    img={query.coverImage}/>
                )
            );
        } else if (queries.length === 0 && isLoading) { 
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
        } else { 
            return (
                <>
                </>
            );
        }
    }

    return (
        <>
        {displayBooks()}
        </>
    );
}

function SearchBar({updateData}) 
{
    const [inputValue, setInputValue] = useState(""); 

    const handleKeyPress = (event) => {
        if (event.key == "Enter") {
            updateData(event.target.value);
        }
    }

    return (
        <div className="search-container">
                <input type="text" placeholder="Search for books..." className="search-input" onKeyDown={(event) => handleKeyPress(event)} onChange={(event) => {setInputValue(event.target.value)}}/>
                <button className="search-button"  onClick={() => {updateData(inputValue)}}>Search</button>
        </div>
    );

}


function Browse() 
{
    const [searchedBookData, setSearchedBookData] = useState([]);
    const [didSearch, setDidSearch] = useState(false);

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
            return book.volumeInfo.imageLinks.thumbnail + "&fife=w800-h900"; 
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

    const getDescription = (book) => {
        const description = book.volumeInfo.description; 

        if (description) 
        {
            const regex = /(<([^>]+)>)/gi;
            const newString = description.replace(regex, " ");
            return newString;
        }

        return "";
    }

    const getBookDataByID =  (id) => {
        return searchedBookData.find((book) => book.id === id);
    }

    const asyncGetBookDataByID = async (id) => {
        const res = await searchBookByID(id).then(data => {return data});
        if (res) 
        {
            const book = createBookObj(res); 
            return book; 
        }
    }


    const createBookObj = (book) => { 
        const author = getAuthors(book);
        const price = getPrice(book);
        const cover = getCover(book);
        const isbn = getISBN(book);
        const description = getDescription(book)

        const bookInfo = {
            "id": book.id,
            "isbn": isbn,
            "title": book.volumeInfo.title,
            "author": author,
            "pageCount": book.volumeInfo.pageCount,
            "publisher": book.volumeInfo.publisher,
            "description": description,
            "price": price,
            "coverImage": cover,
            "amount": 1 // default 
        }

        return bookInfo;

    }

    const updateBookData = async (query) => {
        setDidSearch(true);
        const res = await searchBooks(query).then(data => {return data});
        if (res) {
            const books = res.map((book) => createBookObj(book));
            setSearchedBookData(books);
            setDidSearch(false);
        }
    }

    const params  = useParams();

    return (
        <>
            <Template>
                {params["*"] === "" ? (
                    <>
                        <SearchBar updateData={updateBookData}/>
                        <div className="searchSpace">
                            <BookQueries queries={searchedBookData} isLoading={didSearch}/>
                        </div>
                    </>
                ) : 
                    <>
                        <BookPage getBook={() => asyncGetBookDataByID(params["*"])}/>
                    </>
                }
            </Template>
        </>

    );
}


export default Browse; 