// import logo from './logo.svg';
// import data from './data'
import './App.css';
import { BrowserRouter as Router,Routes , Route,Link} from 'react-router-dom'
import HomeScreen from './components/HomeScreen';
import BookScreen from './components/BookScreen';



function App() {
    const openMenu = () => {
        document.querySelector(".sidebar").classNameList.add("open")
    }
    const closeMenu = () => {
        document.querySelector(".sidebar").classNameList.remove("open")
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
                <a href="cart.html">Cart</a>
                <a href="signin">Signin</a>
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
                    <Route path="/books/:id" element={<BookScreen/>}></Route>
                    <Route path="/" exact={true} element={<HomeScreen/>}/>
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
