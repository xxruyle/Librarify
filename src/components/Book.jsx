import "../styles/main.css"
import Card from "./Card.jsx";
import {Link} from "react-router-dom";



const defaultPreviewImg = 
"http://books.google.com/books/content?id=yl4dILkcqm4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api";

function Book({id, title, author, price, img=defaultPreviewImg}) {
    return (
        <Link to={`/browse/${id}`}>
            <Card key={id}>
                <img src={img} alt="Book Cover" className="book-cover"/>
                <div className="book-info">
                    <h2 className="book-title">{title}</h2>
                    <p className="book-author">{author}</p>
                    <p className="book-price">{price}</p>
                </div>
            </Card>
        </Link>
    );
}


export default Book;
