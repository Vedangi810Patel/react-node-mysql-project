import React, { useState } from 'react';
import './Registration.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        gender: '',
        profilePicture: null,
        hobbies: ''
    });

    const handleChange = (e) => {
        if (e.target.name === 'profilePicture') {
            setFormData({ ...formData, profilePicture: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = e => {
        e.preventDefault();

        try {
            const form = new FormData();
            form.append('firstname', formData.firstname);
            form.append('lastname', formData.lastname);
            form.append('email', formData.email);
            form.append('password', formData.password);
            form.append('gender', formData.gender);
            form.append('profilePicture', formData.profilePicture);
            form.append('hobbies', formData.hobbies);

            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:5000/Registration', true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 201 || xhr.status === 200) {
                        // alert('Registration Successful!');
                        toast.success('Registration Sucessful !');
                        window.location.replace('/');
                        setFormData({
                            firstname: '',
                            lastname: '',
                            email: '',
                            password: '',
                            gender: '',
                            profilePicture: '',
                            hobbies: ''
                        });
                    } else {
                        // alert('Error registering user');
                        toast.error("Error Registering User!");
                    }
                }
            };
            xhr.send(form);
        }
        catch (err) {
            console.log(err, "Unable To Register !");
        }
    }

    return (
        <div className='reg-container'>
            <h2> Registration </h2>
            <form onSubmit={handleSubmit} className='form'>
                <label htmlFor="firstname"> Contact: </label>
                <input type="text" name="firstname" id="firstname" value={formData.firstname} placeholder="vedangi" onChange={handleChange} />

                <label htmlFor="lastname"> Contact: </label>
                <input type="text" name="lastname" id="lastname" value={formData.lastname} placeholder="patel" onChange={handleChange} />

                <label htmlFor="email"> Email: </label>
                <input type="email" name="email" id="email" value={formData.email} placeholder="name@gmail.com" onChange={handleChange} />

                <label htmlFor="password"> password: </label>
                <input type="password" name="password" id="password" value={formData.password} placeholder="password" onChange={handleChange} />

                <label htmlFor="gender"> Contact: </label>
                <input type="text" name="gender" id="gender" value={formData.gender} placeholder="female" onChange={handleChange} />

                <label htmlFor="profilePicture"> Profile: </label>
                <input type="file" name="profilePicture" id="profilePicture" onChange={handleChange} />

                <label htmlFor="address"> hobbies: </label>
                <input type="text" name="hobbies" id="hobbies" value={formData.hobbies} placeholder="hobbies" onChange={handleChange} />

                <button className="submit" type="submit">Register</button>
            </form> <br />

            <Link to={'/LogIn'}> <button className='navigation'> Log In </button> </Link>

        </div>
    )
}

export default Registration;