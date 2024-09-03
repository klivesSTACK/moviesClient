import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap"

export default function ViewComments({ movieId }) {

    const [comments, setComments] = useState([]);
    const [showEdit, setShowEdit] = useState(false);

    const showComments = (movieId) => {
        fetch(`${process.env.REACT_APP_API_URL}/movies/getComments/${movieId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.comments)
            if (Array.isArray(data.comments)) {
                setComments(data.comments);
            }
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
        });
        // open the modal
        setShowEdit(true);
    }

    const closeComments = () => {
        setShowEdit(false);
    }

    return (
        <>
            <Button variant="secondary" type="submit" className="me-auto btn-sm" onClick={() => showComments(movieId)}>view comments</Button>
            <Modal show={showEdit} onHide={closeComments}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>Comments</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            (comments.length > 0)
                            ?   (
                                    comments.map(comment => (
                                        <div key={comment._id}>
                                            <div>
                                                from user: {comment.userId} 
                                            </div>
                                            
                                            <div>
                                                Comment: {comment.comment} 
                                            </div>
                                            <hr/>
                                        </div>
                                    ))
                                ) 
                            
                            :   (
                                    <p>No comments available</p>
                                )
                        }
                        <Button variant="warning" className='ms-auto' onClick={closeComments}>Close</Button>
                    </Modal.Body>
                </Form>
            </Modal>
        </>
    );
}
