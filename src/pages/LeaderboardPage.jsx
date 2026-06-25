import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Medal } from 'lucide-react';
import { asyncGetLeaderboards } from '../states';

export default function LeaderboardPage() {
  const leaderboards = useSelector((state) => state.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetLeaderboards());
  }, [dispatch]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
            <Medal className="text-amber-500" />
            {' '}
            Klasemen Pengguna
          </h2>
          <span className="text-sm font-bold text-slate-500">Skor</span>
        </div>
        <div className="divide-y divide-slate-100">
          {leaderboards.map((item, idx) => (
            <div key={item.user.id} className="p-4 px-6 flex justify-between items-center hover:bg-slate-50">
              <div className="flex items-center gap-4">
                <span className={`font-bold w-6 text-center ${idx === 0 ? 'text-amber-500 text-xl' : 'text-slate-400'}`}>
                  {idx + 1}
                </span>
                <img src={item.user.avatar} alt="avatar" className="w-10 h-10 rounded-full border border-slate-200" />
                <span className="font-semibold text-slate-700">{item.user.name}</span>
              </div>
              <span className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-md">{item.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
