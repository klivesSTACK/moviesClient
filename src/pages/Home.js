import { useContext } from 'react';
import {  Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Home() {

    const { user } = useContext(UserContext); 

    return (
        <>
        <Row id="home">
            <Col className="p-4 text-center mt-5 " >
                <h1>Movies Catalog</h1>
                <p>Explore the vast World of Movies!</p>
                {
                    (user.id)
                    ? <Link className="btn btn-primary buttonList" to={'/movies'}>Movies list</Link>
                    : <Link className="btn btn-danger buttonLogin" to={'/login'}>Login to explore</Link>
                }  
            </Col>
        </Row>
        </>
    )
}