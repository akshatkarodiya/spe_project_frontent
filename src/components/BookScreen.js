import React, { useEffect, useState } from "react";
import { Link , useParams,Redirect,useNavigate} from "react-router-dom";
// import {useRouter} from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { detailsBooks } from "../actions/bookAction";

function BookScreen(props) {

    const [qty, setQty] = useState(1);
    const bookDetails = useSelector(state=>state.bookDetails);
    const {book,loading,error} = bookDetails;
    console.log(loading);
    console.log(book)
    const dispatch = useDispatch();
    const {id}=useParams();
    // const router = useRouter();
    // const history = useHistory();
    useEffect(()=>{
        
        dispatch(detailsBooks(id));
        return () => {
            
        };
    }, [])
    const navigate = useNavigate();
    const handleAddtoCart = () => {
        // window.location.replace(`/cart/${id}?qty=${qty}`);
        navigate(`/cart/${id}?qty=${qty}`);
        // router.push('/cart/'+id+'?qty='+qty);
    }

    return <div>

        <div className="back-to-result">
            <Link to="/">Back to result</Link>
        </div>

        {loading? <div>loading..</div>:
          error? <div>error...</div>:
         (
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
                        Qty: <select value={qty} onChange={(e)=>{setQty(e.target.value)}}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </li>
                    <li>
                        <button onClick={handleAddtoCart} className="button">Add to cart</button>
                    </li>
                </ul>

            </div>
        </div>
         )
        }

        

    </div>
}

export default BookScreen