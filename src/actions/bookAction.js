import axios from "axios";
import { BOOK_LIST_FAIL, BOOK_LIST_REQUEST, BOOK_LIST_SUCCESS,BOOK_DETAILS_REQUEST,BOOK_DETAILS_SUCCESS,BOOK_DETAILS_FAIL, BOOK_SAVE_REQUEST, BOOK_SAVE_SUCCESS, BOOK_SAVE_FAIL, BOOK_DELETE_REQUEST, BOOK_DELETE_SUCCESS, BOOK_DELETE_FAIL } from "../constants/constant"

const listBooks = () => async (dispatch) => {
    try{
    dispatch({type: BOOK_LIST_REQUEST});
    const {data} = await axios.get("/book/getAllBooks/");
    dispatch({type: BOOK_LIST_SUCCESS, payload:data})
    }
    catch (error){
        dispatch({type: BOOK_LIST_FAIL, payload:error.message})
    }
}

const detailsBooks = (bookId)=>async (dispatch) => {

    try{
        dispatch({type: BOOK_DETAILS_REQUEST,payload:bookId});

        const {data} = await axios.get("/book/getBookById/"+bookId);
        dispatch({type: BOOK_DETAILS_SUCCESS, payload:data})
        }
        catch (error){
            dispatch({type: BOOK_DETAILS_FAIL, payload:error.message})
        }
}

const deleteBook = (bookId)=>async (dispatch) => {

    try{
        dispatch({type: BOOK_DELETE_REQUEST,payload:bookId});

        const {data} = await axios.delete("/book/deleteBookById/"+bookId);
        dispatch({type: BOOK_DELETE_SUCCESS, payload:data})
        }
        catch (error){
            dispatch({type: BOOK_DELETE_FAIL, payload:error.message})
        }
}
const saveBook = (book)=>async (dispatch) => {

    try{
        dispatch({type: BOOK_SAVE_REQUEST,payload:book});
        console.log(book)
        if(book.bookId){
            const {data} = await axios.post("/book/addBooks/",book);
            dispatch({type: BOOK_SAVE_SUCCESS, payload:data})
        }
        else{
            const {data} = await axios.put("/book/updateBook/"+book.bookId,book);
            dispatch({type: BOOK_SAVE_SUCCESS, payload:data})
        }
        
        }
        catch (error){
            dispatch({type: BOOK_SAVE_FAIL, payload:error.message})
        }
}


export {listBooks,detailsBooks,saveBook,deleteBook}