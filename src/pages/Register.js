import { useState, useEffect, useContext } from "react"
import { Form, Button } from "react-bootstrap"
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import { Navigate, Link } from 'react-router-dom'; 

export default function Register(){

    const [ name, setName ] =useState('');
    const [ email, setEmail ] =useState('');
    const [ password, setPassword ] =useState('')
    const [isActive, setIsActive] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(()=>{
		if(
            name !== "" && 
            email !== "" && 
            password !== "" 
           ){
			setIsActive(true)
		} else {
			setIsActive(false)
		}
	},[name, email, password])

    function registerUser(e) {

        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/users/register`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({

            name: name,
            email: email,
            password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.message === "Registered Successfully"){
                Swal.fire({
                    title: "Registration Successful",
                    icon: "success",
                    text: "Thank you for registering!"
                });
            }
            setName('')
            setEmail('');
            setPassword(''); 
        })
        .catch(error => {
            console.error('Error message:', error)     
        });
    }

    return(
        
        (user.id !== null)
        ? 
        <Navigate to='/' />
        :
        <Form onSubmit={(e) => registerUser(e)} className='col-md-6 mx-auto col-sm-8'>
            <h1 className="my-5 text-center">Register</h1>
            <Form.Group>
                <Form.Label>Name:</Form.Label>
                <Form.Control 
                type="name"
                placeholder="Enter Name" 
                required 
                value={name} 
                onChange={e => {setName(e.target.value)}}
                className=''/>
            </Form.Group>
            <Form.Group>
                <Form.Label className='mt-3'>Email:</Form.Label>
                <Form.Control 
                type="email" 
                placeholder="Enter Email" 
                required 
                value={email} 
                onChange={e => {setEmail(e.target.value)}}
                className=''/>
            </Form.Group>
            <Form.Group>
                <Form.Label className='mt-3'>Password:</Form.Label>
                <Form.Control 
                type="password" 
                placeholder="Enter Password" 
                required 
                value={password} 
                onChange={e => {setPassword(e.target.value)}}/>
            </Form.Group>
            {
                (isActive)
                ? 
                <>
                    <div className="d-flex mt-3">
                        <Button variant="primary" type="submit" className='mt-3'>Submit</Button>
                        <p className="ms-auto"> Registered? <Link as={Link} to="/login" >Login</Link></p>
                    </div>
                </>
                : 
                <>
                    <div className="d-flex mt-3">
                        <Button variant="danger" disabled >Submit</Button>
                        <p className="ms-auto"> Registered? <Link as={Link} to="/login" >Login</Link></p>
                    </div>
                </>
            }  
        </Form>
    )
}