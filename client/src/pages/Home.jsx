import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.log('No token found in localStorage');
        navigate('/', { replace: true });
        return;
      }

      const response = await axios.get('http://localhost:3000/auth/home', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status !== 201) {
        navigate('/', { replace: true });
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.log('Fetch error:', err.response?.data || err.message);
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return null;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="shadow-lg px-8 py-5 w-96">
        <h2 className="text-lg font-bold mb-4">Home</h2>
      </div>
    </div>
  );
};

export default Home;
