import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap'
import { Navigate, Link } from 'react-router-dom'; 
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function Login(){

    const { user, setUser } = useContext(UserContext);
    const [ email, setEmail] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isActive, setIsActive] = useState(false)
    
    useEffect(()=>{
        if(email !== '' && password !== ''){
            setIsActive(true)
        }else{
            setIsActive(false)
        }
    },[email, password])

    function authenticate(e) {
            // Prevents page redirection via form submission
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/users/login`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if( typeof data.access !== 'undefined'){
                localStorage.setItem('token', data.access);
                retrieveUserDetails(data.access);
                Swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    text: "Welcome to Movies Catalog"
                });
            }else {
                Swal.fire({
                title: "Error",
                icon: "error",
                text: "Wrong Username or Password"
                });
            }        
        })
        setEmail('');
        setPassword('');
    }

    const retrieveUserDetails = (token) => {
        
        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })
        .then(res => res.json())
        .then(data => {
            setUser({
            name: data.user.name,
            id: data.user._id,
            isAdmin: data.user.isAdmin
            });
        })
        .catch(error => {
            console.error('Error message:', error)     
        });
    };

    return(
        (user.id !== null)
        ?
            <Navigate to='/' />
        :
        <Form onSubmit={(e) => authenticate(e)} className='col-md-6 mx-auto col-sm-8'>
            <h1 className="my-5 text-center">Login</h1>
            <Form.Group controlId="userEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </Form.Group>

            <Form.Group controlId="password">
            <Form.Label className='mt-3'>Password</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </Form.Group>

            { 
             ( isActive )
            ? 
                <div className="d-flex mt-3">
                    <Button variant="primary" type="submit" id="submitBtn">
                        Submit
                    </Button>
                    <p className='ms-auto'> no account yet? <Link as={Link} to="/register" >Register</Link></p>
                </div>
            : 
                <div className="d-flex mt-3">
                    <Button variant="danger" type="submit" id="submitBtn" disabled >
                        Submit
                    </Button>
                    <p className='ms-auto'> no account yet? <Link as={Link} to="/register" >Register</Link></p>
                </div>
            }  
        </Form>   
    )
}