import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value });
    }
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/auth/register', values)
            console.log(response);
            navigate('/login', { replace: true });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="shadow-lg px-8 py-5 w-96">
                <h2 className="text-lg font-bold mb-4">Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label clasName="block text-gray-700">Username</label>
                        <input type="text" placeholder="Enter Username" className="w-full px-3 py-2 border rounded" required 
                        name="username" onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input type="email" placeholder="Enter Email" className="w-full px-3 py-2 border rounded" required 
                        name="email" onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input type="password" placeholder="Enter Password" className="w-full px-3 py-2 border rounded" required 
                        name="password" onChange={handleChange} />
                    </div>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded">Submit</button>
                </form>
                <div className="text-center">
                    <span>Already have an account?</span>
                    <Link to="/login" className="text-blue-500">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register;
