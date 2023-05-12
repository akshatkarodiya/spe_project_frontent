import React, { useEffect, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listBooks, saveBook, deleteBook } from "../actions/bookAction";
// import { detailsBooks } from "../actions/productAction";

function BooksScreen(props) {
    const [modalVisible,setModalVisible] = useState(false);
    const [bookId, serBookId] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [availableForRent, setAvailableForRent] = useState('');
    const [availableForSale, setavailableForSale] = useState('');
    const [description, setDescription] = useState('');
    const bookList = useSelector(state=>state.bookList)
    const {loading,books,eroor} = bookList;
    const bookSave = useSelector(state=>state.bookSave)
    const {loading: loadingSave, success: successSave, error:errorSave} = bookSave; 
    const bookDelete = useSelector(state=>state.bookDelete)
    const {loading: loadingDelete, success: successDelete, error:errorDelete} = bookDelete;
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(successSave)
        {
            setModalVisible(false);
        }
        dispatch(listBooks());
        return () => {
            
        };
    }, [successSave,successDelete])
    
    const openModal = (book) =>{
        console.log(book)
        setModalVisible(true)
        serBookId(book.bookId)
        setTitle(book.title)
        setPrice(book.price)
        setImage(book.image)
        setGenre(book.genre)
        setAuthor(book.author)
        setDescription(book.description)
        setAvailableForRent(book.availableForRent)
        setavailableForSale(book.availableForSale)

    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveBook({ bookId: bookId,title,price,author,image,genre,description,availableForRent,availableForSale}));
      }
    const deleteHandler = (book) => {
        dispatch(deleteBook(book.bookId));
      }
    
    return (
    <div className="content content-margined">
    <div className="product-header">
      <h3>Books</h3>
      <button onClick={()=>openModal({})} className="button primary">
        Add New Book
      </button>
      </div>
      { modalVisible && 
      <div className="form">
        <form onSubmit={submitHandler} >
        <ul className="form-container">
        <li>
            <h2>Add New Book</h2>
            </li>
            <li>
            {loadingSave && <div>Loading...</div>}
            {errorSave && <div>{errorSave}</div>}
            </li>
            <li>
                <label htmlFor="title">
                    Title
                </label>
                <input type="text" value={title} name="title" id="title"  onChange={(e) => setTitle(e.target.value)}>
                </input>
            </li>
            <li>
                <label htmlFor="author">
                    Author
                </label>
                <input type="text" value={author} name="author" id="author"  onChange={(e) => setAuthor(e.target.value)}>
                </input>
            </li>
            <li>
                <label htmlFor="genre">
                    Genre
                </label>
                <input type="text" value={genre} name="genre" id="genre"  onChange={(e) => setGenre(e.target.value)}>
                </input>
            </li>
            <li>
                <label htmlFor="Description">
                    Description
                </label>
                <input type="text" value={description} name="description" id="description"  onChange={(e) => setDescription(e.target.value)}>
                </input>
            </li>
            <li>
                <label htmlFor="Image">
                    Image URL
                </label>
                <input type="text" value={image} name="image" id="image"  onChange={(e) => setImage(e.target.value)}>
                </input>
            </li>
            <li>
                <label htmlFor="Price">
                    Price
                </label>
                <input type="text" value={price} name="price" id="price"  onChange={(e) => setPrice(e.target.value)}>
                </input>
            </li>
            <li>
            Available For Rent
            <select defaultValue="true" onChange={(e)=>setAvailableForRent(e.target.value) }>
                <option value="true">Yes</option>
                <option value="false">NO</option>
            </select>
            </li>
            <li>
            Available For Sale
            <select defaultValue="true" onChange={(e)=>setavailableForSale(e.target.value) }>
                <option value="true">Yes</option>
                <option value="false">NO</option>
            </select>
            </li>
            <li>
            <button type="submit" className="button primary">{bookId? "Update":"Create"}</button>
            </li>
            <li>
            <button type="submit" onClick={()=>setModalVisible(false)} className="button secondary">Back</button>
            </li>
        </ul>
        </form>
        </div>
}
      <div className="product-list">
      <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Genre</th>
              <th>Author</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.bookId}>
                <td>{book.bookId}</td>
                <td>{book.title}</td>
                <td>{book.price}</td>
                <td>{book.genre}</td>
                <td>{book.author}</td>
                <td>
                  <button onClick={()=>openModal(book)} className="button">
                    Edit
                  </button>{' '}
                  <button onClick={()=>deleteHandler(book)}
                    className="button" >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
    )
}

export default BooksScreen