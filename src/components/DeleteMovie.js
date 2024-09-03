import { Button } from "react-bootstrap"
import Swal from "sweetalert2";

export default function DeleteMovie({movieId, getMovies}){
   
    const deleteMovie=(e,movieId)=>{
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/movies/deleteMovie/${movieId}`,{
            method: 'DELETE',
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then( res => res.json())
        .then( data => {
            console.log(data)
            if(data.message === 'Movie deleted successfully'){
                Swal.fire({
                    title: "Success!",
                    icon: "success",
                    text: "Movie deleted successfully"
                }) 
                getMovies();
            }else {
                Swal.fire({
                    title: "Error!",
                    icon: "error",
                    text: "Something went wrong!"
                })
            }
        })
        .catch(error => {
            console.error('Error message:', error)     
        });  
    }

    return(
        <Button variant="danger" type="submit" className="btn-sm" onClick={(e)=>deleteMovie(e,movieId)}>delete</Button> 
    )
}