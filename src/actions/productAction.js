import axios from "axios";
import { BOOK_LIST_FAIL, BOOK_LIST_REQUEST, BOOK_LIST_SUCCESS } from "../constants/constant"

const listBooks = () => async (dispatch) => {
    try{
    dispatch({type: BOOK_LIST_REQUEST});
    const {data} = await axios.get("/getAllBooks");
    dispatch({type: BOOK_LIST_SUCCESS, payload:data})
    }
    catch (error){
        dispatch({type: BOOK_LIST_FAIL, payload:error.message})
    }
}

export {listBooks}