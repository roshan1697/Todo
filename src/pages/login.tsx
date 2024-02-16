import  { useState } from 'react';
import {Link} from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        // Todo: Create a type for the response that you get back from the server
        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token)
            window.location = "/todos";
        } else {
            alert("invalid credentials");
        }
    };

    return (
        <div className='flex items-center justify-center h-screen border border-black'>
            <div className='grid '>
                <h2 className='text-xl font-semibold text-center'>Login</h2>
                <input className='p-2 m-2 border-2 rounded-lg outline-none' type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
                <input className='p-2 m-2 border-2 rounded-lg outline-none' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                <span className='px-2 my-2'>
                    
                New here? 
                <Link className='text-blue-500 underline cursor-pointer' to="/signup"> Signup</Link>
                </span>
                <button className='px-4 py-2 font-semibold text-white bg-blue-500 border-2 rounded-xl hover:bg-blue-300' onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default Login;
