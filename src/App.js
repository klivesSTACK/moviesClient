import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AppNavbar from './components/AppNavbar';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { UserProvider } from './UserContext';
import Logout from './pages/Logout';
import Movies from './pages/Movies';
import SingleMovieCard from './pages/SingleMovieCard';
import AddMovie from './pages/AddMovie';

function App() {

  //initial user state (Global)
  const [ user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  const fetchData=()=>{
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${ localStorage.getItem('token') }`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)

      if (typeof data.user !== "undefined") {

        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin
        });

      } else {

        setUser({
          id: null,
          isAdmin: null
        });

      }

    })
    .catch(error => {
      console.error('Error message:', error)     
    });
  }

  useEffect(() => {

    fetchData()

    }, []);

  const unsetUser = () => {
    localStorage.clear();
  }


  return (
    <UserProvider value={{user, setUser, unsetUser}}>
       <Router>
          <AppNavbar />
           <Container fluid>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/getMovie/:movieId" element={<SingleMovieCard />} />
              <Route path="/addMovie" element={<AddMovie />} />

            </Routes>
           </Container>
        </Router>
    </UserProvider>
  )
}

export default App;
