import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { asyncSetAuthUser } from '../states';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(asyncSetAuthUser({ email, password })).unwrap();
      navigate('/');
    } catch (error) {
      alert(error.message || 'Email atau password salah');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Login Forum</h2>
      <form onSubmit={onLogin} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full border p-3 rounded-lg focus:outline-emerald-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full border p-3 rounded-lg focus:outline-emerald-500"
        />
        <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700">
          Masuk
        </button>
      </form>
      <p className="text-center mt-4 text-sm text-slate-600">
        Belum punya akun?
        {' '}
        <Link to="/register" className="text-emerald-600 font-bold">Daftar</Link>
      </p>
    </div>
  );
}
