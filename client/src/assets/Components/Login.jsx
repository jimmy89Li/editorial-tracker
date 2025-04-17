import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Missing credentials');
      setIsLoading(false);
      return;
    }

    try {
      await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data || !data.user) {
            setError('Invalid user data');
            setIsLoading(false);
            return;
          }

          localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/dashboard');
        });
    } catch (err) {
      console.log(err);
      setError('Invalid credentials');
      setIsLoading(false);
    }
  };

  return (
    <div className='w-lvw flex justify-center mt-4'>
      <div className='w-3xl p-4 bg-teal-800 text-white rounded-sm flex flex-col'>
        <h2 className='text-2xl mb-2'>Login</h2>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Your email'
          className='bg-amber-50 text-black placeholder-gray-500 p-2 rounded-sm w-1/2 flex-wrap mb-4'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleLogin();
            }
          }}
          placeholder='Your password'
          className='bg-amber-50 text-black placeholder-gray-500 p-2 rounded-sm w-1/2 flex-wrap mb-4'
        />
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className='cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'
        >
          Login
        </button>
        {error && <p className='text-red-300'>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
