import React, { useEffect } from "react";
// import data from "../data";
import { Link }from 'react-router-dom';

// import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { listBooks } from "../actions/bookAction";

function HomeScreen() {
    // const [books, setBooks] = useState([]);
    const booksList = useSelector(state=>state.bookList);
    const {books, loading , error} = booksList;
    const dispatch = useDispatch();


    useEffect(()=> {
        dispatch(listBooks());
        // const fetchData = async() =>{
        //    const {data} = await axios.get("/getAllBooks");
        //    setBooks(data);
        // }
        // fetchData();
        return () =>{

        };
    },[])
    return loading ? <div>loading...</div>:
           error ? <div>error.....</div>:
    ( 
           <ul className="products">
                {   books.map(book =>
                <li key={book.bookId}> 
                    <div className="product">
                    <Link to={"/book/" + book.bookId}>
                        <img className="product-image" src={book.image} alt="product"/>
                        </Link>
                        <div className="product-name">
                            <Link to={"/book/" + book.bookId}>{book.title}</Link>
                            </div>
                        <div className="product-author">{book.author}</div>
                        <div className="product-price">${book.price}</div>
                        <div className="product-genre">{book.genre}</div>
                        <div className="product-rating">{book.rating} Stars ({book.numReviews})</div>

                    </div>
                </li>
                )
                }
            </ul>
    );
}

export default HomeScreen