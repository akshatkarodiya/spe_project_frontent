import React from "react";
import { Link, useParams } from "react-router-dom";
import data from "../data";
// function BookScreen() {
//     return (<div className="temp">Book Screem</div>);
// }
// import React from "react";

function BookScreen(props) {
    // if (!props.match) {
    //     return <div>Loading...</div>;
    // }
    
    const {id}=useParams();
    const book = data.books.find(x => x._id === id)

    return <div>
        <div className="back-to-result">
            <Link to="/">Back to result</Link>
        </div>
        <div className="details">
            <div className="details-image">
                <img src={book.image} alt="book"></img>
            </div>
            <div className="details-info">
                <ul>
                    <li>
                        <h4>
                            {book.name}
                        </h4>
                    </li>
                    <li>
                        <h4>
                            {book.author}
                        </h4>
                    </li>
                    <li>
                        <h4>
                            {book.rating} Stars ({book.numReviews} Reviews) 
                        </h4>
                    </li>
                    <li>
                        <b>
                            Price : ${book.price}
                        </b>
                    </li>
                    <li>
                        Description :
                        <div>
                            {book.description}
                        </div>
                    </li>
                </ul>
            </div>
            <div className="details-action">
                <ul>
                    <li>
                        Price: ${book.price}
                    </li>
                    <li>
                        Status: {book.status}
                    </li>
                    <li>
                        Qty: <select>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </li>
                    <li>
                        <button className="button">Add to cart</button>
                    </li>
                </ul>

            </div>
        </div>

    </div>
}

export default BookScreen