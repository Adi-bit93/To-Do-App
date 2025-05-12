import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState();
    const [error, setError] = useState("");

    console.log(name, email, age);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const addUser = { name, email, age };

        try {
            const response = await fetch("http://localhost:5000", {
                method: "POST",
                body: JSON.stringify(addUser),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            if (!response.ok) {
                console.log(result.error);
                setError(result.error || "An unexpected error occurred.");
            } else {
                console.log(result);
                setError("");
                setName("");
                setEmail("");
                setAge();
                navigate("/all")
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Unable to connect to the server.");
        }
    };

    return (
        <div className='container my-2'>
            {error && <div className="alert alert-danger">{error}</div>}
            <h2 className='text-center'>Enter the data</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input
                        type="number"
                        className="form-control"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Create;
