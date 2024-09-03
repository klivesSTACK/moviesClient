import { useEffect, useState } from "react";
import { Row, Card, Button, Form } from "react-bootstrap"
import { useParams, Link } from "react-router-dom"
import Swal from "sweetalert2";


export default function SingleMovieCard(){

    const [ comments, setComments ] =useState('');
    const [ addComment, setAddComment ] = useState('');
    const { movieId } = useParams();
    const [ movie, setMovie ] =useState('')

    const addAComment = (e, movieId ) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/movies/addComment/${movieId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                comment: addComment
            })
        })
        .then( res => res.json())
        .then( data => {
            console.log(data)
            if(data.message === "Comment added successfully"){
                Swal.fire({
                    title: "Successful",
                    icon: "success",
                    text: "Comment added successfully"
                });
                fetchData();
            }
        }).catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
        setAddComment('')  
    }

    function fetchData(){
        fetch(`${process.env.REACT_APP_API_URL}/movies/getMovie/${movieId}`,{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then( res => res.json())
        .then ( data => {
            console.log(data)
            console.log(data.comments)
            if(typeof data !== 'undefined'){
                setMovie(data)
                setComments(data.comments)
            }else {
                setMovie(null)
                setComments(null)
            }     
        })
        .catch(error => {
            console.error('Error message:', error)     
        });
    }

    useEffect(() =>{
        fetchData();
    },[])

    return(
            <div className='col-lg-6  col-sm-12 mt-3 mx-auto' >
                <Card className="cardHighlight " >
                    <Card.Header className="text-center" ><h5>{movie.title}</h5> </Card.Header>
                    <Card.Body className="">
                        <Card.Text >Director: {movie.director}</Card.Text>
                        <Card.Text>Year: {movie.year}</Card.Text>
                        <Card.Text>Description: {movie.description}</Card.Text>
                        <Card.Text className="mt-auto ">Genre: {movie.genre}</Card.Text>
                        <Card.Text >Comments:</Card.Text>
                        <Card.Text >
                            {
                                (comments.length > 0)
                                ?   (
                                        comments.map(comment => (
                                            <Row key={comment._id} >
                                                <div className="comment my-1 py-1">
                                                    <div >
                                                        from user: {comment.userId} 
                                                    </div>
                                                
                                                    <div >
                                                        Comment: {comment.comment} 
                                                    </div>
                                                </div>
                                            </Row>
                                        ))
                                    ) 
                                
                                :   (
                                        <p>No comments available</p>
                                    )
                            }
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Form onSubmit={(e)=>addAComment(e, movieId)}>
                            <Form.Control 
                                as="textarea"
                                required 
                                placeholder='Write yout comment here'
                                value={addComment} 
                                onChange={e=> setAddComment(e.target.value)}
                            />
                            <div className="d-flex my-2 ">  
                                <Link to = {`/movies`}   > <Button variant="warning" type="submit"> go back</Button> </Link>
                                <Button variant="success" type="submit" className="ms-auto">Add comment</Button>
                            </div>
                        </Form>
                    </Card.Footer>
                </Card>
            </div>      
    )
}