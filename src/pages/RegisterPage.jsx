import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { asyncRegister } from '../states';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = async (e) => {
    e.preventDefault();
    try {
      await dispatch(asyncRegister({ name, email, password })).unwrap();
      navigate('/');
    } catch (error) {
      alert(error.message || 'Pendaftaran gagal');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Daftar Forum</h2>
      <form onSubmit={onRegister} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama"
          required
          className="w-full border p-3 rounded-lg focus:outline-emerald-500"
        />
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
          Daftar
        </button>
      </form>
      <p className="text-center mt-4 text-sm text-slate-600">
        Sudah punya akun?
        {' '}
        <Link to="/login" className="text-emerald-600 font-bold">Masuk</Link>
      </p>
    </div>
  );
}
