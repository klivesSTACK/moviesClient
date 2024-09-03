import { useState } from 'react'
import { Modal, Form, Button, } from 'react-bootstrap'
import Swal from 'sweetalert2';


export default function AddComments({movieId}){

    const [ comment, setComment ] = useState('');
    const [ showEdit, setShowEdit ] = useState(false)
    
    const addComment = (e, movieId ) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/movies/addComment/${movieId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                comment: comment
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
            }
        }).catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

        setComment('')
        setShowEdit(false)
    }

    const openAddComment = () =>{

        setShowEdit(true)
    }

    const closeAddComment = () => {

        setShowEdit(false)
    }

    return(
        <>
            <div className=" btn btn-sm bg-secondary text-light" onClick={()=> openAddComment()}>add comment</div>
            <Modal show={showEdit} onHide={closeAddComment}>
                <Form onSubmit={(e)=>addComment(e, movieId)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a comment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>    
                        <Form.Group controlId="productName">
                            <Form.Label>comment:</Form.Label>
                            <Form.Control 
                            as="textarea"
                            required 
                            placeholder='Write yout comment here'
                            value={comment} 
                            onChange={e=> setComment(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="success" type="submit" className='mt-3 align-end'>Add comment</Button>
                    </Modal.Body> 
                </Form>
            </Modal>
        </>    
    )
}