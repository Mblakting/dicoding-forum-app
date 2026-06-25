import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function RegisterInput({ register }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form onSubmit={(e) => { e.preventDefault(); register({ name, email, password }); }} className="space-y-4">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama" required className="w-full border p-3 rounded-lg focus:outline-emerald-500" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full border p-3 rounded-lg focus:outline-emerald-500" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full border p-3 rounded-lg focus:outline-emerald-500" />
      <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700">Daftar</button>
    </form>
  );
}

RegisterInput.propTypes = { register: PropTypes.func.isRequired };
