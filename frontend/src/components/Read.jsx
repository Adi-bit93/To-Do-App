import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Read = () => {

    const [data, setData] = useState([]);
    const [error, setError] = useState("");


    async function getData(){
        const response = await fetch("http://localhost:5000");
        const result = await response.json();

        if (!response.ok) {
            console.log(result.error);
            setError(result.error || "An unexpected error occurred.");
        }

        if(response.ok){
            setData(result)
        }
    }

    const handleDelete = async(id) =>{
        const response = await fetch(`http://localhost:5000/${id}`, {
            method:"DELETE"
        });
        const result = await response.json();

        if (!response.ok) {
            console.log(result.error);
            setError(result.error || "An unexpected error occurred.");
        }

        if(response.ok){
            setError("Deleted successfully");

            setTimeout(() =>{
                setError("");
                getData();
            }, 1000);

        }

    }

    useEffect(() =>{
        getData();
    }, [])

    console.log(data);



    return <div className='container my-2'>
         {error && <div className="alert alert-danger">{error}</div>}
        <h2 className='text-center'>All data</h2>

        <div className='row'>
            {data.map((ele) =>(
                <div  key={ele._id} className='col-3'>
                <div className=" card" >
                    <div className="card-body">
                        <h5 className="card-title">{ele.name}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">{ele.email}</h6>
                        <p className="text-muted">{ele.age}</p>
                        <a href="#" className="card-link" onClick={() => handleDelete(ele._id)}>Delete</a>
                       <button className=''> <Link to={`/${ele._id}`} className="card-link ">Edit </Link></button>
                    </div>
                </div>
            </div>
            ))}
            
        </div>
    </div>
}

export default Read