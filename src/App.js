// import logo from './logo.svg';
// import data from './data'
import './App.css';
import { BrowserRouter as Router,Routes , Route,Link} from 'react-router-dom'
import HomeScreen from './components/HomeScreen';
import BookScreen from './components/BookScreen';
import CartScreen from './components/CartScreen';
import SigninScreen from './components/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './components/RegisterScreen';
import BooksScreen from './components/BooksScreen';
import ShippingScreen from './components/ShippingScreen';
import PaymentScreen from './components/PaymentScreen';
import PlaceOrderScreen from './components/PlaceOrderScreen';



function App() {

    const userSignin = useSelector(state=>state.userSignin)
    // <a href="/signin">Signin</a>
    // console.log(userSignin["name"]);
    const {userInfo} = userSignin;
    console.log(userSignin);
    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open")
    }
    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open")
    }
  return (
    <Router>
    <div className="grid-container">
            <header className="header">
            
             <div className="brand">
                <button onClick={openMenu}>
                    &#9776;
                </button>
                <Link to="/">Bookart</Link>
             </div>
             <div className="header-links">
                <a href="/cart">Cart</a>
                {Object.keys(userSignin).length === 0 ?
                ( <Link to="/signin">Signin</Link> ):
                (<Link to="/profile">{userSignin.name}</Link>)
                   
                }
               { userSignin && userSignin.isAdmin && (
              <div className="dropdown">
                <a href="/profile">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/books">Books</Link>
                  </li>
                </ul>
              </div>
            )}
                
             </div>
            </header>

            <aside className="sidebar">
                <h3>Book Categories</h3>
                <button className="sidebar-close-button" onClick={closeMenu}>X</button>
                <ul>
                    <li>
                        <a href="index.html">Genres</a>
                    </li>
                    <li>
                        <a href="index.html">Author</a>
                    </li>
                </ul>
            </aside>
            <main className="main">
                <div className="content">
                    <div>
                    <Routes>
                    <Route path="/book/:id" element={<BookScreen/>}></Route>
                    <Route path="/books" element={<BooksScreen/>}></Route>
                    <Route path="/signin" element={<SigninScreen/>}></Route>
                    <Route path="/register" element={<RegisterScreen/>}></Route>
                    <Route path="/shipping" element={<ShippingScreen/>}></Route>
                    <Route path="/placeOrder" element={<PlaceOrderScreen/>}></Route>
                    <Route path="/payment" element={<PaymentScreen/>}></Route>
                    <Route path="/" exact={true} element={<HomeScreen/>}/>
                    <Route path="/cart/:id?" element={<CartScreen/>}/>
                    </Routes>
                    </div>
                 
                </div>
            </main>
            <footer className="footer"> All rights reserved </footer>
        </div>
        </Router> 
  );
}

export default App;
