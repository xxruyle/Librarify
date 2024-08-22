import Template from "./Template";
import image from "../../res/book-icon.png"
import "../styles/main.css";

function Home() 
{
    return (
        <Template>
            <h1>Welcome to Librarify</h1>
            <img className="bookIcon" src={image} alt=""/>
        </Template>
    );
}

export default Home; 