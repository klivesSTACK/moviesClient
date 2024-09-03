import { useState, useContext, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';


export default function AddMovie(){

    const { user }=useContext(UserContext);
    const [ title, setTitle]=useState('');
    const [ director, setDirector]=useState('');
    const [ year, setYear]=useState('');
    const [ description, setDescription]=useState('');
    const [ genre, setGenre]=useState('');

    console.log(user)

    const addMovie=(e)=>{

        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/movies/addMovie`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
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
            console.log()
            if(data.message === ""){
                Swal.fire({
                    title: "Add Successful",
                    icon: "success",
                    text: "Movie successfully added"
                }); 
                
            }else if(data.message === 'Movie already exist'){
                Swal.fire({
                    title: "Error",
                    icon: "error",
                    text: "Movie already exist"
                }); 
            }else{
                Swal.fire({
                    title: "Error",
                    icon: "error",
                    text: "Something went wrong"
                }); 
            }
        })
        setTitle('');
        setDirector('');
        setYear('');
        setDescription('');
        setGenre('');

    }

    useEffect(()=>{

    })
    
    return(
        <>
        {
                (user.isAdmin !== true)
                ? <Navigate to='/' />
                :
                <>
                    <h1 className="mt-5 text-center">Add Movie</h1>
                    <Form className='col-md-6 mx-auto col-sm-8' onSubmit={(e)=>addMovie(e)}>
                    <Form.Group controlId="userEmail">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control 
                        type="title"
                        placeholder="Enter Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    </Form.Group>

                    <Form.Group controlId="director">
                    <Form.Label className='mt-3'>Director:</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Director"
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
                        required
                    />
                    </Form.Group>

                    <Form.Group controlId="year">
                    <Form.Label className='mt-3'>Year:</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                    />
                    </Form.Group>

                    <Form.Group controlId="year">
                    <Form.Label className='mt-3'>Description:</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        placeholder="Enter Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    </Form.Group>  

                    <Form.Group controlId="genre">
                    <Form.Label className='mt-3'>Genre:</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    />
                    </Form.Group> 
                    <Button variant="primary" type="submit" className='px-5 mt-3 '>Submit</Button>
                </Form> 
            </>
        } 
        </>
    
    )
}