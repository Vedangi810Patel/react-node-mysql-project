import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {

    return (
        <div className='home'>
            <h1> Home Page </h1>
            <ul>
                <li> <Link className='link' to={'/Registration'}> Registration </Link> </li> <br />
                <li> <Link className='link' to={'/LogIn'}> LogIn </Link> </li>
            </ul>
        </div>
    );
};

export default Home;