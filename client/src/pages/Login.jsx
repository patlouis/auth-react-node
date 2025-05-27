import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
        <div className="shadow-lg px-8 py-5 border w-96">
            <h2 className="text-lg font-bold mb-4">Login</h2>
            <form>
                <div className="mb-4">
                    <label htmlFor="email" clasName="block text-gray-700">Username</label>
                    <input type="text" placeholder="Enter Username" className="w-full px-3 py-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input type="email" placeholder="Enter Email" className="w-full px-3 py-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Password</label>
                    <input type="password" placeholder="Enter Password" className="w-full px-3 py-2 border rounded" required />
                </div>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded">Submit</button>
            </form>
            <div className="text-center">
                <span>Don't have an account?</span>
                <Link to="/register" className="text-blue-500">Register</Link>
            </div>
        </div>
    </div>
  )
}

export default Login;
