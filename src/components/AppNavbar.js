import { useContext } from 'react';
import { Navbar, Container, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContext from '../UserContext';

export default function AppNavbar(){

    const { user } = useContext(UserContext);
    return(
        <Navbar expand="lg" bg="primary" data-bs-theme="dark">
            <Container fluid>
                {
                    (user.id)
                    ? <Navbar.Brand as={Link} to="/movies">Movies Catalog</Navbar.Brand>
                    : <Navbar.Brand >Movies Catalog</Navbar.Brand>
                }
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="text-white">
                    <Nav.Link as={Link} to="/" >Home</Nav.Link>
                    <Nav  className="ms-auto">
                        {
                            (user.id)
                            ? 
                                (user.isAdmin)
                                ?
                                <>
                                    <Nav.Link as={Link} to="/addMovie" >Add Movie</Nav.Link>
                                    <Nav.Link as={Link} to="/logout" >logout</Nav.Link>
                                </>
                                :
                                <>
                                    <Nav.Link as={Link} to="/logout" >logout</Nav.Link>
                                </>
                            :
                            <>
                                <Nav.Link as={Link} to="/login" >login</Nav.Link>
                                <Nav.Link as={Link} to="/register" >Register</Nav.Link>
                            </>    
                        }
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}