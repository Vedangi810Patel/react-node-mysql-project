import React, { useState } from 'react';
import './LogIn.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogIn = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            // const form = new FormData();
            // form.append('email', formData.email);
            // form.append('password', formData.password);
            console.log()

            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:5000/LogIn', true);
            xhr.setRequestHeader("Content-Type", "application/json");
            // xhr.setRequestHeader('Authentication', token);
            xhr.send(JSON.stringify(formData));
            xhr.onload = () => {

                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 201 || xhr.status === 200) {
                        alert('Log In Successful!');
                        toast.success('Log In Successful!');
                        setFormData({
                            email: '',
                            password: ''
                        });
                        const response = JSON.parse(xhr.responseText);
                        const {token} = response;
                        localStorage.setItem('token', token);
                        window.location.replace('/AllCategory');

                    } else {
                        // console.log(formData)
                        // alert('Error Log In!');
                        toast.error("Unable to Log In !")
                    }
                }
            }

        } catch (err) {
            console.error(err, "Unable To Log In!");
        }
    }

    return (
        <div className='log-container'>
            <h2> Log In </h2> <br />
            <form onSubmit={handleSubmit} className='form'>
                <label htmlFor="email"> Email: </label>
                <input type="email" name="email" id="email" value={formData.email} placeholder="name@gmail.com" onChange={handleChange} />

                <label htmlFor="password"> password: </label>
                <input type="password" name="password" id="password" value={formData.password} placeholder="password" onChange={handleChange} />

                <button className='submit' type="submit">Log In</button>

            </form> <br />

            <Link to={'/Registration'}> <button className='navigation'> Registration </button> </Link>

        </div>
    )

}

export default LogIn;