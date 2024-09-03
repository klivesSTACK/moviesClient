import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap"
import Swal from "sweetalert2";

export default function EditMovie({movieId, getMovies}){

    const [ title, setTitle ] =useState('');
    const [ year, setYear ] =useState('');
    const [ director, setDirector] =useState('');
    const [ description, setDescription ] =useState('');
    const [ genre, setGenre ] =useState('')
    const [showEdit, setShowEdit] = useState(false);

    const openEdit=()=>{
        setShowEdit(true);
        fetch(`${process.env.REACT_APP_API_URL}/movies/getMovie/${movieId}`,{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then( res => res.json())
        .then( data => {
            console.log(data)
            setTitle(data.title);
            setDirector(data.director);
            setYear(data.year);
            setDescription(data.description);
            setGenre(data.genre);
        })
        .catch(error => {
            console.error('Error message:', error)     
        }); 
    }

    const closeEdit =() => {
        setShowEdit(false)
       
    }

    const editMovie=(e, movieId) =>{
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/movies/updateMovie/${movieId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                title: title,
                director: director,
                year: year,
                description: description,
                genre: genre
            })
        })
        .then( res => res.json())
        .then( data => {
            console.log(data)
            if(data.message === 'Movie updated successfully'){
                Swal.fire({
                    title: "Success!",
                    icon: "success",
                    text: "Movie updated successfully"
                })
                getMovies()
                closeEdit();
            }else {
                Swal.fire({
                    title: "Error!",
                    icon: "error",
                    text: "Something went wrong!"
                })
                getMovies()
                closeEdit();
            }
        })
        .catch(error => {
            console.error('Error message:', error)     
        });    
    }
    return (
        <>
            <Button variant="secondary" type="submit" className="btn-sm mx-1" onClick={()=>openEdit()}>edit</Button>   
            <Modal show={showEdit} onHide={closeEdit}>
            <Form onSubmit={(e)=>editMovie(e,movieId)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>    
                    <Form.Group controlId="title" className="mt-1">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control 
                            type="text" 
                            required 
                            value={title}
                            onChange={e=> setTitle(e.target.value)}
                        />
                    </Form.Group >
                    <Form.Group controlId="director" className="mt-3">
                        <Form.Label>Director: </Form.Label>
                        <Form.Control 
                            type="text" 
                            required 
                            value={director} 
                            onChange={e=> setDirector(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="year" className="mt-3">
                        <Form.Label>Year:</Form.Label>
                        <Form.Control 
                            type="number" 
                            required 
                            value={year}
                            onChange={e=> setYear(e.target.value)}
                        />
                    </Form.Group >
                    <Form.Group controlId="description" className="mt-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            as="textarea"
                            required value={description} 
                            onChange={e=> setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="genre" className="my-3">
                        <Form.Label>Genre: </Form.Label>
                        <Form.Control 
                            type="text" 
                            required 
                            value={genre} 
                            onChange={e=> setGenre(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className="d-flex">
                    <Button variant="secondary" className="me-auto" onClick={closeEdit} >close</Button>
                    <Button variant="primary" type='submit'>edit movie</Button>
                </Modal.Footer>
            </Form>
            </Modal>
        </>
    )
}