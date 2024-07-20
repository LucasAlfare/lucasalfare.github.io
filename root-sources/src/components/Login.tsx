import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [token, setToken] = useState<string>('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://fl-refs.onrender.com/login', {
        email: email,
        plainPassword: password
      });
      const receivedToken = response.data;
      setToken(receivedToken);
      setError('');

      Cookies.set('token', receivedToken, { expires: 7 });

    } catch (error) {
      setError('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-5">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Entrar</button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {token && <div className="mt-4">
        <h3 className="text-lg font-bold">Login bem sucedido!</h3>
      </div>}
    </div>
  );
};

export default Login;