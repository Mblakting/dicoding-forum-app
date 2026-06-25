import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateData, asyncToggleVoteThread, asyncAddThread } from '../states';
import ThreadItem from '../components/ThreadItem';

export default function HomePage() {
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateData());
  }, [dispatch]);

  const categories = [...new Set(threads.map((t) => t.category))];
  const filteredThreads = filter ? threads.filter((t) => t.category === filter) : threads;

  const onAddThread = async (e) => {
    e.preventDefault();
    try {
      await dispatch(asyncAddThread({ title, category, body })).unwrap();
      setTitle('');
      setCategory('');
      setBody('');
    } catch (error) {
      alert(error.message || 'Gagal membuat thread');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            type="button"
            onClick={() => setFilter('')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border ${!filter ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600'}`}
          >
            Semua
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border ${filter === cat ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600'}`}
            >
              #
              {cat}
            </button>
          ))}
        </div>
        {filteredThreads.map((thread) => (
          <ThreadItem
            key={thread.id}
            thread={thread}
            user={users.find((u) => u.id === thread.ownerId)}
            authUser={authUser}
            onVote={(id, vote) => dispatch(asyncToggleVoteThread(id, vote))}
          />
        ))}
      </div>

      <div>
        {authUser ? (
          <form onSubmit={onAddThread} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-24 space-y-4">
            <h3 className="font-bold text-lg">Buat Diskusi Baru</h3>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Judul"
              required
              className="w-full border rounded-lg p-2 text-sm"
            />
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Kategori"
              required
              className="w-full border rounded-lg p-2 text-sm"
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Isi diskusi..."
              required
              rows="4"
              className="w-full border rounded-lg p-2 text-sm"
            />
            <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700">
              Kirim
            </button>
          </form>
        ) : (
          <div className="bg-emerald-50 text-emerald-800 p-6 rounded-xl border border-emerald-200 text-center">
            Login untuk membuat thread baru!
          </div>
        )}
      </div>
    </div>
  );
}
