import { useEffect, useState, useContext } from "react"
import { Card, Row } from 'react-bootstrap'
import { Link } from "react-router-dom"
import ViewComments from "../components/ViewComments"
import AddComments from "../components/AddComments"
import UserContext from "../UserContext"
import EditMovie from "../components/EditMovie"
import DeleteMovie from "../components/DeleteMovie"
import { Navigate } from "react-router-dom"

export default function Movies(){

    const { user }=useContext(UserContext)
    const [ movies, setMovies] = useState('')
    
    const getMovies = () =>{
        fetch(`${process.env.REACT_APP_API_URL}/movies/getMovies`,{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then( res => res.json())
        .then ( data => {
            if(data.movies){
                const moviesArr = data.movies.map( movie => {
                    return(
                        // map movie
                        <div className='col-lg-4 col-md-6 col-sm-12 mt-3 ' key={movie._id}>
                            <Card className="cardHighlight " >
                                <Card.Header className="text-center" >
                                    {
                                        (user.isAdmin === true)
                                        ?
                                            <div className="d-flex">
                                                <h5 className="me-auto">{movie.title}</h5>
                                                <Link className = "btn btn-secondary btn-sm d-block" to = {`/getMovie/${movie._id}`}>details</Link>
                                                <EditMovie movieId={movie._id} getMovies={getMovies}/>
                                                <DeleteMovie movieId={movie._id} getMovies={getMovies}/>
                                            </div> 
                                        :
                                            <div className="d-flex">
                                                    <h5 className="me-auto">{movie.title} </h5>
                                                    <Link className = "btn btn-secondary btn-sm d-block" to = {`/getMovie/${movie._id}`}>details</Link>
                                            </div> 
                                    }
                                </Card.Header>
                                <Card.Body className="d-flex flex-column ">
                                    <Card.Text >Director: {movie.director}</Card.Text>
                                    <Card.Text>Year:  {movie.year}</Card.Text>
                                    <Card.Text>Description: {movie.description} </Card.Text>
                                    <Card.Text className="mt-auto "> Genre: {movie.genre} </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <div className="d-flex">
                                        <ViewComments movieId={movie._id}/>
                                        <AddComments movieId={movie._id}/>
                                    </div>
                                </Card.Footer>
                            </Card>
                        </div> 
                    ) 
                    
                });
                setMovies(moviesArr) 
            }else {
                setMovies(<h5>no movies found</h5>) 
            }
                      
        })
        .catch(error => {
            console.error('Error message:', error)     
        });
    }

    useEffect(() =>{
        getMovies();
    },[user])

    return(
        (user === null)
        ?
            <Navigate to='/' />
        :
        <>
            <h1 className="text-center mt-3">List of movies</h1> 
            <Row>
                {movies}
            </Row>   
        </>
    )
}